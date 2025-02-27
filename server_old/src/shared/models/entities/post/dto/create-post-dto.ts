import {
	ApiProperty,
	ApiPropertyOptional
} from '@nestjs/swagger';
import {
	IsBase64,
	IsNotEmpty,
	IsOptional
} from 'class-validator';

export class CreatePostDto {
	@ApiProperty({
		type: String,
		description: 'Conteúdo da postagem',
	})
	@IsNotEmpty({message: 'Conteúdo da postagem não pode ser vazio!'})
	content: string;
	
	@ApiPropertyOptional({
		type: String,
		description: 'Arquivo da postagem em base64',
		required: false,
	})
	@IsOptional()
	@IsBase64({}, {message: 'Arquivo da postagem deve ser base64!'})
	file?: string;
}
