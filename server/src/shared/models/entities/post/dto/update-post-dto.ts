import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class UpdatePostDto {
	@ApiProperty({
		type: String,
		description: 'Conteúdo da postagem',
	})
	@IsNotEmpty({message: 'Conteúdo da postagem não pode ser vazio!'})
	content: string;
}
