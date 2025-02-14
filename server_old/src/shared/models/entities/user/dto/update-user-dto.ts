import {ApiPropertyOptional} from '@nestjs/swagger';
import {
	IsBase64,
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator';

export class UpdateUserDto {
	@ApiPropertyOptional({
		type: String,
		description: 'Nome de exibição do usuário',
		required: false
	})
	@IsOptional()
	@ApiPropertyOptional({
		type: String,
		description: 'Nome de exibição',
		maxLength: 255,
	})
	@MaxLength(255, {message: 'Nome de exibição deve ter no máximo 255 caracteres!'})
	name: string;
	
	@ApiPropertyOptional({
		type: String,
		description: '"Sobre mim" do usuário',
		required: false
	})
	@IsOptional()
	@IsString({message: 'Sobre mim do usuário deve ser uma string!'})
	about?: string;
	
	@ApiPropertyOptional({
		type: String,
		description: 'Avatar do usuário em base64',
		required: false
	})
	@IsOptional()
	@IsBase64({}, {message: 'Avatar do usuário deve ser base64!'})
	avatar?: string;
}
