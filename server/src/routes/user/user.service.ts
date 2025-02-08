import {Injectable} from '@nestjs/common';
import {WbService} from '../wb.service';
import {User} from '../../shared/models/entities/user/user';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UpdateUserDto} from '../../shared/models/entities/user/dto/update-user-dto';

@Injectable()
export class UserService extends WbService<User, void, UpdateUserDto> {
	constructor(
			@InjectRepository(User)
			public readonly repository: Repository<User>,
			@InjectRepository(User)
			public readonly userRepository: Repository<User>
	) {
		super(repository, userRepository);
	}
}
