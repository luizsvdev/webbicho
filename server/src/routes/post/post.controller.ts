import {
	Body,
	Controller,
	DefaultValuePipe,
	Headers,
	Param,
	ParseIntPipe,
	ParseUUIDPipe,
	UseGuards
} from '@nestjs/common';
import {WbController} from '../wb.controller';
import {Post} from '../../shared/models/entities/post/post';
import {PostService} from './post.service';
import {CheckJwtGuard} from '../../core/guards/check-jwt.guard';
import {ApiTags} from '@nestjs/swagger';
import {WhereParam} from '../../shared/models/types/where-param';
import {
	ApiBulkDeleteOperation,
	ApiBulkUpdateOperation,
	ApiCreateOperation,
	ApiDeleteOperation,
	ApiFindOneOperation,
	ApiListOperation,
	ApiUpdateOperation,
} from '../../shared/helpers/api-swagger-helper';
import {HEADER} from '../../core/cors/headers';
import {
	DeepPartial,
	FindOptionsOrder
} from 'typeorm';
import {Page} from '../../shared/models/classes/page';
import {PATH} from '../../core/cors/paths';
import {CreatePostDto} from '../../shared/models/entities/post/dto/create-post-dto';
import {UpdatePostDto} from '../../shared/models/entities/post/dto/update-post-dto';
import {RootController} from '../../shared/models/interfaces/root-controller.interface';
import {PARAM} from '../../core/cors/params';

@Controller('post')
@UseGuards(CheckJwtGuard)
@ApiTags('Posts')
export class PostController
	extends WbController<
		Post,
		PostService,
		CreatePostDto,
		UpdatePostDto
	>
	implements RootController<Post> {
	
	constructor(service: PostService) {
		super(service);
	}
	
	@ApiFindOneOperation()
	public async findOne(
			@Param(PARAM.UUID, ParseUUIDPipe) uuid?: string,
			@Headers(HEADER.FIELDS) fields?: string[],
			@Headers(HEADER.RELATIONS) relations?: string[],
			@Headers(HEADER.PARAMS) params?: WhereParam<Post>[],
	): Promise<Post> {
		return super.findOne(uuid, fields, relations, params);
	}
	
	@ApiListOperation()
	public async list(
			@Param(PATH.PAGE, new DefaultValuePipe(1), ParseIntPipe) page: number,
			@Param(PATH.SIZE, new DefaultValuePipe(9), ParseIntPipe) size: number,
			@Headers(HEADER.FIELDS) fields?: string[],
			@Headers(HEADER.RELATIONS) relations?: string[],
			@Headers(HEADER.PARAMS) params?: WhereParam<Post>[],
			@Headers(HEADER.ORDER) order?: FindOptionsOrder<Post>,
	): Promise<Page<Post>> {
		return super.list(page, size, fields, relations, params, order);
	}
	
	@ApiCreateOperation()
	public async create(
			@Body() entity: CreatePostDto,
			@Headers(HEADER.USER_UUID) userUuid: string,
	): Promise<Post> {
		return super.create(entity, userUuid);
	}
	
	@ApiUpdateOperation()
	public async update(
			@Headers(HEADER.USER_UUID) userUuid: string,
			@Param(PARAM.UUID, ParseUUIDPipe) uuid: string,
			@Body() entity: UpdatePostDto,
	): Promise<Post> {
		return super.update(uuid, userUuid, entity);
	}
	
	@ApiBulkUpdateOperation()
	public async bulkUpdate(
			@Body() entity: DeepPartial<Post>,
					userUuid: string,
					params: WhereParam<Post>[],
	): Promise<void> {
		return super.bulkUpdate(entity, userUuid, params);
	}
	
	@ApiDeleteOperation()
	public async delete(
			@Param(PARAM.UUID, ParseIntPipe) id: string,
			@Headers(HEADER.USER_UUID) userUuid: string,
	): Promise<void> {
		return super.delete(id, userUuid);
	}
	
	@ApiBulkDeleteOperation()
	async bulkDelete(
			@Headers(HEADER.USER_UUID) userUuid: string,
			@Headers(HEADER.PARAMS) params: WhereParam<Post>[],
	): Promise<void> {
		return super.bulkDelete(userUuid, params);
	}
}
