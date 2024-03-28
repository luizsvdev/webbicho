import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {GenericEntity} from '../shared/models/entities/generic-entity';
import {DeepPartial, FindManyOptions, FindOneOptions, FindOptionsOrder, FindOptionsWhere, Repository} from 'typeorm';
import {QueryDeepPartialEntity} from 'typeorm/query-builder/QueryPartialEntity';
import {Page} from '../shared/models/classes/page';
import {convertParam, convertParams} from '../shared/helpers/convert-helper';
import {WhereParam} from '../shared/models/types/where-param';

@Injectable()
export abstract class GenericService<T extends GenericEntity> {
  public readonly entityName: string;
  
  protected constructor(
      public readonly repository: Repository<T>,
  ) {
    this.entityName = this.repository.metadata.name;
  }
  
  public async findOne(
      entityId?: string,
      fields?: string[],
      relations?: string[],
      params?: WhereParam<T>[],
  ): Promise<T> {
    if (!params && !entityId) {
      throw new HttpException('Nenhum parâmetro informado', HttpStatus.BAD_REQUEST);
    }
    const where: FindOptionsWhere<T>[] = params ?
        convertParams(params).map(p => ({...p, id: entityId})) :
        undefined;
    const options: FindOneOptions = {
      select: fields,
      relations: relations,
      where: where,
    };
    return await this.repository.findOne(options);
  }
  
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
      where: params ? convertParam(params) : undefined,
      skip: (page - 1) * size,
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
  
  public async create(
      entity: DeepPartial<T>,
      userId: string,
  ): Promise<T> {
    const exists: boolean = await this.repository.existsBy({id: entity?.id} as FindOptionsWhere<T>);
    if (exists) {
      throw new HttpException(`${this.repository.metadata.name} ${entity?.id} já existe!`, HttpStatus.CONFLICT);
    }
    entity.createdBy = userId;
    entity.updatedBy = userId;
    await this.repository.insert(entity as QueryDeepPartialEntity<T>);
    return await this.repository.findOneByOrFail({id: entity.id} as FindOptionsWhere<T>);
  }
  
  public async update(
      entity: DeepPartial<T>,
      userId: string,
  ): Promise<T> {
    const exists: boolean = await this.repository.existsBy({id: entity?.id} as FindOptionsWhere<T>);
    if (!exists) {
      throw new HttpException(`${this.repository.metadata.name} ${entity?.id} não encontrado!`, HttpStatus.NOT_FOUND);
    }
    entity.updatedBy = userId;
    await this.repository.update(
        {id: entity.id} as FindOptionsWhere<T>,
        entity as QueryDeepPartialEntity<T>,
    );
    return await this.repository.findOneByOrFail({id: entity.id} as FindOptionsWhere<T>);
  }
  
  public async delete(
      params: WhereParam<T>[],
      entityId: string,
  ): Promise<void> {
    if (entityId) {
      if (!params) params = [{id: entityId}];
      params = params.map(p => ({...p, id: entityId}));
    }
    const convertedParams: FindOptionsWhere<T>[] = params ? convertParams(params) : undefined;
    const exists: boolean = await this.repository.existsBy(convertedParams);
    if (!exists) {
      throw new HttpException(`${this.repository.metadata.name} ${entityId} não encontrado!`, HttpStatus.NOT_FOUND);
    }
    for (const where of convertedParams) {
      await this.repository.delete(where);
    }
  }
  
  public async patch(
      entity: DeepPartial<T>,
      userId: string,
      params: WhereParam<T>[],
  ): Promise<void> {
    const convertedParams: FindOptionsWhere<T>[] = convertParams(params);
    entity.updatedBy = userId;
    for (const where of convertedParams) {
      await this.repository.update(
          where,
          entity as QueryDeepPartialEntity<T>,
      );
    }
  }
}
