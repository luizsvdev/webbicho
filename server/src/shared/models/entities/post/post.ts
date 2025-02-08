import {WbEntity} from '../wb-entity';
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany
} from 'typeorm';
import {User} from '../user/user';
import {Comment} from '../comment/comment';

@Entity()
export class Post extends WbEntity {
	@Column({type: 'text'})
	content: string;
	
	@Column({type: 'text', nullable: true})
	file: string;
	
	@ManyToOne(
			() => User,
			user => user.posts,
	)
	user: User;
	
	@OneToMany(
			() => Comment,
			comment => comment.post,
			{
				nullable: true,
				cascade: true,
			}
	)
	comments: Comment[];
}
