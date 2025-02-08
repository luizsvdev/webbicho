import {WbEntity} from '../wb-entity';
import {
	Column,
	Entity,
	ManyToOne
} from 'typeorm';
import {User} from '../user/user';
import {Post} from '../post/post';

@Entity()
export class Comment extends WbEntity {
	@Column({type: 'text'})
	content: string;
	
	@ManyToOne(
			() => User,
			user => user.comments,
	)
	user: User;
	
	@ManyToOne(
			() => Post,
			post => post.comments,
	)
	post: Post;
}
