import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

export abstract class WbEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid?: string;
	
	@Column({
		type: 'uuid',
		nullable: true,
	})
	createdBy?: string;
	
	@Column({
		type: 'uuid',
		nullable: true,
	})
	updatedBy?: string;
	
	@CreateDateColumn()
	createdAt?: Date;
	
	@UpdateDateColumn()
	updatedAt?: Date;
	
	@DeleteDateColumn()
	deletedAt?: Date;
}
