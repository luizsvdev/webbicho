import {ApiProperty} from '@nestjs/swagger';
import {
	IsNotEmpty,
	IsString
} from 'class-validator';

export class UpdateCommentDto {
	@ApiProperty({
		type: String,
		example: 'This is a comment',
		description: 'The content of the comment',
	})
	@IsNotEmpty()
	@IsString()
	content: string;
}
