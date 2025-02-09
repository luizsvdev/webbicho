import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {
	ConfigModule,
	ConfigService
} from '@nestjs/config';
import {DatabaseService} from './database.service';
import {EnvironmentModule} from '../environment/environment.module';
import {EnvironmentService} from '../environment/environment.service';

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule, EnvironmentModule],
			inject: [ConfigService, EnvironmentService],
			useClass: DatabaseService
		})
	],
})
export class DatabaseModule {
}
