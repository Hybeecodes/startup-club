import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from '../schemas/posts.schema';
import { PostsController } from './posts.controller';
import { PromotionsService } from '../promotions/promotions.service';
import { PromotionSchema } from '../schemas/promotion.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: 'Promotion',
        schema: PromotionSchema,
      },
    ]),
    UsersModule,
  ],
  providers: [PostsService, PromotionsService],
  controllers: [PostsController],
})
export class PostsModule {}
