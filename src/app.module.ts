import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { PostService } from './modules/post/post.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService, PostService],
})
export class AppModule {}
