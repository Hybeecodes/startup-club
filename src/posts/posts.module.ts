import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from '../schemas/posts.schema';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema
      }
    ])
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
