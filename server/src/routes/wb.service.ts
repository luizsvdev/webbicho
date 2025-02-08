import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import {WbEntity} from '../shared/models/entities/wb-entity';
import {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	FindOptionsOrder,
	FindOptionsWhere,
	InsertResult,
	QueryRunner,
	Repository,
} from 'typeorm';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';
import {Page} from '../shared/models/classes/page';
import {WhereParam} from '../shared/models/types/where-param';
import {
	EUserRole,
	User
} from '../shared/models/entities/user/user';
import {convertParams} from '../shared/helpers/convert-helper';

@Injectable()
export abstract class WbService<
	T extends WbEntity,
	CT,
	UT,
> {
	public readonly entityName: string;
	
	protected constructor(
			public readonly repository: Repository<T>,
			public readonly userRepository: Repository<User>,
	) {
		this.entityName = this.repository.metadata.name;
	}
	
	/**
	 * @description Busca uma única entidade do tipo T no repositório.
	 * @param entityId id da entidade.
	 * @param fields campos a serem buscados na consulta.
	 * @param relations relações a serem carregadas na consulta.
	 * @param params parâmetros de busca da consulta.
	 * @returns - a entidade encontrada.
	 * @throws BadRequestException se nenhum parâmetro for informado.*/
	public async findOne(
			entityId?: string,
			fields?: string[],
			relations?: string[],
			params?: WhereParam<T>[],
	): Promise<T> {
		if (!params && !entityId) {
			throw new BadRequestException(
					'Nenhum parâmetro informado',
			);
		}
		const where: FindOptionsWhere<T>[] = convertParams(params)
				.map(p => ({...p, uuid: entityId}));
		const options: FindOneOptions = {
			select: fields,
			relations: relations,
			where: where,
		};
		return await this.repository.findOne(options);
	}
	
	/**
	 * @description Busca uma lista de entidades do tipo T no repositório.
	 * @param page número da página.
	 * @param size número de itens a serem carregados
	 * @param fields campos a serem buscados na consulta
	 * @param relations relações a serem carregadas na consulta
	 * @param params parâmetros de busca da consulta
	 * @param order ordem de resultado da consulta
	 * @returns a página de entidades encontradas*/
	public async list(
			page: number,
			size: number,
			fields?: string[],
			relations?: string[],
			params?: WhereParam<T>[],
			order?: FindOptionsOrder<T>,
	): Promise<Page<T>> {
		const options: FindManyOptions = {
			select: fields,
			relations: relations,
			where: convertParams(params),
			skip: page * size,
			take: size,
			order: order,
		};
		const [data, count]: [T[], number] = await this.repository.findAndCount(options);
		return new Page(
				data,
				page,
				Math.ceil(count / size),
				count,
		);
	}
	
	/**
	 * @description Cria uma nova entidade do tipo T no repositório.
	 * @param createEntityDto - entidade a ser criada.
	 * @param userUuid - id do usuário que está criando a entidade.
	 * @returns a entidade criada.*/
	public async create(
			createEntityDto: CT,
			userUuid: string,
	): Promise<T> {
		const entity: T = createEntityDto as never as T;
		await this.beforeCreate(entity, userUuid);
		
		const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();
		await queryRunner.startTransaction();
		try {
			const result: InsertResult = await this.repository.insert(
					entity as QueryDeepPartialEntity<T>,
			);
			await queryRunner.commitTransaction();
			const uuid: string = result.identifiers?.[0]?.uuid as string;
			return await this.repository.findOneByOrFail(
					{uuid} as FindOptionsWhere<T>,
			);
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			void queryRunner.release();
		}
	}
	
	/**
	 * @description Atualiza uma entidade no repositório pelo uuid.
	 * @param entityId - id da entidade a ser atualizada.
	 * @param entityDto - entidade parcial com novas alterações.
	 * @param userUuid - id do usuário que está atualizando a entidade.
	 * @returns a entidade atualizada.
	 * @throws NotFoundException se a entidade não for encontrada.*/
	public async update(
			entityId: string,
			entityDto: UT,
			userUuid: string,
	): Promise<T> {
		const entity: T = entityDto as never as T;
		await this.beforeUpdate(entityId, entity, userUuid);
		const exists: boolean = await this.repository.existsBy(
				{uuid: entityId} as FindOptionsWhere<T>,
		);
		if (!exists) {
			throw new NotFoundException(
					`${this.repository.metadata.name} ${entityId} não encontrado!`,
			);
		}
		const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();
		await queryRunner.startTransaction();
		try {
			await this.repository.update(
					{uuid: entityId} as FindOptionsWhere<T>,
					entity as QueryDeepPartialEntity<T>,
			);
			await queryRunner.commitTransaction();
			return await this.repository.findOneByOrFail(
					{uuid: entityId} as FindOptionsWhere<T>,
			);
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			void queryRunner.release();
		}
	}
	
	/**
	 * @description Atualiza várias entidades por parâmetros.
	 * @param entity - entidade parcial com novas alterações.
	 * @param userUuid - id do usuário que está atualizando a entidade.
	 * @param params - parâmetros de busca das entidades a serem atualizadas.*/
	public async bulkUpdate(
			entity: DeepPartial<T>,
			userUuid: string,
			params: WhereParam<T>[],
	): Promise<void> {
		await this.beforeBulkUpdate(entity, userUuid);
		const convertedParams: FindOptionsWhere<T>[] = convertParams(
				params,
		);
		entity.updatedBy = userUuid;
		const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();
		await queryRunner.startTransaction();
		try {
			for (const where of convertedParams) {
				await this.repository.update(
						where, entity as QueryDeepPartialEntity<T>,
				);
			}
			await queryRunner.commitTransaction();
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			void queryRunner.release();
		}
	}
	
	/**
	 * @description Deleta uma entidade do repositório pelo uuid.
	 * @param entityId - uuid da entidade a ser deletada.
	 * @param userUuid - uuid do usuário que está deletando a entidade.
	 * @throws NotFoundException se a entidade não for encontrada.*/
	public async delete(
			entityId: string,
			userUuid: string,
	): Promise<void> {
		await this.beforeDelete(entityId, userUuid);
		const exists: boolean = await this.repository.existsBy(
				{uuid: entityId} as FindOptionsWhere<T>,
		);
		if (!exists) {
			throw new NotFoundException(
					`${this.repository.metadata.name} ${entityId} não encontrado!`,
			);
		}
		const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();
		await queryRunner.startTransaction();
		try {
			await this.repository.softDelete(
					{uuid: entityId} as FindOptionsWhere<T>,
			);
			await queryRunner.commitTransaction();
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			void queryRunner.release();
		}
	}
	
	/**
	 * @description Deleta várias entidades por parâmetros.
	 * @param params - parâmetros de busca das entidades a serem deletadas.
	 * @param userUuid - id do usuário que está deletando as entidades.*/
	public async bulkDelete(
			params: WhereParam<T>[],
			userUuid: string,
	): Promise<void> {
		await this.beforeBulkDelete(params, userUuid);
		const convertedParams: FindOptionsWhere<T>[] = convertParams(params);
		const exists: boolean = await this.repository.existsBy(convertedParams);
		if (!exists) {
			throw new NotFoundException(
					`Nenhum ${this.repository.metadata.name} encontrado(a)!`,
			);
		}
		const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();
		await queryRunner.startTransaction();
		try {
			for (const where of convertedParams) {
				await this.repository.softDelete(
						where,
				);
			}
			await queryRunner.commitTransaction();
		} catch (e) {
			await queryRunner.rollbackTransaction();
			throw e;
		} finally {
			void queryRunner.release();
		}
	}
	
	/**
	 * @description Método chamado antes de criar uma entidade.
	 * @param entity - entidade parcial a ser criada.
	 * @param userUuid - UUID do usuário executando a criação */
	protected async beforeCreate(entity: T, userUuid: string): Promise<void> {
		entity.createdBy = userUuid;
		return Promise.resolve();
	}
	
	/**
	 * @description Método chamado antes de atualizar uma entidade.
	 * @param entityUuid - uuid da entidade a ser atualizada.
	 * @param entity - entidade parcial com novas alterações.
	 * @param userUuid - uuid do usuário que está atualizando a entidade.*/
	protected async beforeUpdate(
			entityUuid: string,
			entity: T,
			userUuid: string,
	): Promise<void> {
		const user: User = await this.userRepository.findOneOrFail(
				{
					select: ['uuid', 'role'],
					where: {
						uuid: userUuid,
					},
				},
		);
		const found: T = await this.repository.findOne(
				{
					select: ['uuid', 'createdBy'],
					where: {uuid: entityUuid} as FindOptionsWhere<T>,
				},
		);
		if (user.uuid != found.createdBy || user.role != EUserRole.STAFF) {
			throw new ForbiddenException(
					'Acesso negado',
			);
		}
		entity.updatedBy = userUuid;
	}
	
	/**
	 * @description Método chamado antes de atualizar várias entidades.
	 * @param _entity - entidade parcial com novas alterações.
	 * @param userUuid - id do usuário que está atualizando a entidade.*/
	protected async beforeBulkUpdate(
			_entity: DeepPartial<T>,
			userUuid: string,
	): Promise<void> {
		const user: User = await this.userRepository.findOneOrFail(
				{
					select: ['uuid'],
					where: {
						uuid: userUuid,
					},
				},
		);
		if (user.uuid != _entity.createdBy)
			throw new ForbiddenException(
					'Acesso negado',
			);
	}
	
	/**
	 * @description Método chamado antes de deletar uma entidade.
	 * @param entityId - id da entidade a ser deletada.
	 * @param userUuid - id do usuário que está deletando a entidade.*/
	protected async beforeDelete(
			entityId: string,
			userUuid: string,
	): Promise<void> {
		const user: User = await this.userRepository.findOneOrFail(
				{
					select: ['uuid'],
					where: {
						uuid: userUuid,
					},
				},
		);
		const entity: T = await this.repository.findOneOrFail(
				{
					select: ['uuid', 'createdBy'],
					where: [{
						uuid: entityId,
					}] as FindOptionsWhere<T>[],
				},
		);
		if (user.uuid != entity.createdBy)
			throw new ForbiddenException(
					'Acesso negado',
			);
	}
	
	/**
	 * @description Método chamado antes de deletar várias entidades.
	 * @param params - parâmetros de busca das entidades a serem deletadas.
	 * @param userUuid - id do usuário que está deletando as entidades.*/
	protected async beforeBulkDelete(
			params: WhereParam<T>[],
			userUuid: string,
	): Promise<void> {
		if (!params?.length)
			throw new BadRequestException(
					'Nenhum parâmetro fornecido',
			);
		const user: User = await this.userRepository.findOneOrFail(
				{
					select: ['uuid', 'role'],
					where: {
						uuid: userUuid,
					},
				},
		);
		if (user.role != EUserRole.STAFF) {
			for (const param of params) {
				param.createdBy = user.uuid;
			}
		}
	}
}
