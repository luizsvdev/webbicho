import {WbEntity} from '../shared/models/entities/wb-entity';
import {WbService} from './wb.service';
import {Repository} from 'typeorm';

describe('GenericService', () => {
	let service: WbService<WbEntity, void, void>;
	let repository: Repository<WbEntity>;
	
	beforeEach(() => {
		repository = new Repository<WbEntity>();
		service = new WbService<WbEntity>(repository);
	});
	
	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
