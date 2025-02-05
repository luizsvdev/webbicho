import {Module} from '@nestjs/common';
import {DatabaseModule} from './core/database/database.module';
import {AuthModule} from './routes/auth/auth.module';
import {PostModule} from './routes/post/post.module';
import {CommentModule} from './routes/comment/comment.module';
import {UserModule} from './routes/user/user.module';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		DatabaseModule,
		AuthModule,
		PostModule,
		CommentModule,
		UserModule,
	],
	controllers: [AppController],
})
export class AppModule {
}
