import {
	Test,
	TestingModule
} from '@nestjs/testing';
import {WbService} from './wb.service';
import {WbEntity} from '../shared/models/entities/wb-entity';

describe('GenericService', (): void => {
	let service: WbService<WbEntity>;
	
	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: WbService,
					useClass: WbEntity,
				},
			],
		}).compile();
		
		service = module.get<WbService<WbEntity>>(WbService);
	});
	
	it('should be defined', (): void => {
		expect(service).toBeDefined();
	});
});
