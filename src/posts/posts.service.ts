import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostInterface } from './post.interface';
import { CreatePostDto } from 'src/DTOs/CreatePost.dto';
import { PromotionsService } from '../promotions/promotions.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
    constructor(
      @InjectModel('Post')
      private readonly postModel: Model<PostInterface>,
      private readonly userService: UsersService,
      private readonly promotionService: PromotionsService,
    ) {
    }

    // TODO:: handle exceptions using try-catch blocks (something like return error: error.message)
    async findAll(): Promise<PostInterface[]> {
        return await this.postModel.find().exec();
    }

    async findUserPosts(userId: string) {
        return await this.postModel.find({ author: userId }).exec();
    }

    async findById(id: string): Promise<PostInterface | undefined> {
        const post = await this.postModel.findById(id).exec();
        if (!post) {
            throw new NotFoundException('Post doesn\'t exist');
        }
        return post;
    }

    async findBySlug(slug: string): Promise<PostInterface | undefined> {
        const post = await this.postModel.findOne({ slug }).exec();
        if (!post) {
            throw new NotFoundException('Post doesn\'t exist');
        }
        return post;
    }

    async create(postData, id: string): Promise<PostInterface | undefined> {
        let newPost = new this.postModel(postData);
        newPost.author = id;
        newPost.slug = `${newPost.title.replace(/ /g, '_')}_${Date.now().toString()}`;
        newPost = await newPost.save();
        if (!newPost) {
            throw new InternalServerErrorException('Unable to create new Post');
        }
        return newPost;
    }

    async update(postData: CreatePostDto, id: string): Promise<PostInterface | undefined> {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new NotFoundException('Post doesn\'t exist');
        }
        post.body = postData.body;
        post.title = postData.title;
        const updatedPost = await post.save();
        if (!updatedPost) {
            throw new InternalServerErrorException('Unable to update post');
        }
        return updatedPost;
    }

    async delete(id: string) {
        const deleted = this.postModel.findByIdAndRemove(id);
        if (!deleted) {
            throw new InternalServerErrorException('Unable to delete post');
        }
        return deleted;
    }

    async promote(postId: string, medium: string, userId: string) {
        if (!medium) {
            throw new BadRequestException('Promotion medium is required');
        }
        // create promotion
        const promotion = await this.promotionService.new({
            postId,
            promoter: userId,
            medium,
        });
        // TODO:: use promise.all() for all async functions
        if (!promotion) {
            throw new InternalServerErrorException('Unable to create new promotion');
        }
        const post = await this.postModel.findById(postId);
        if (post) {
            post.promotions.push(promotion.id);
            await post.save();
        }
        const user = await this.userService.userModel.findById(userId);
        if (user) {
            user.promotions = user.promotions + 1;
            await user.save();
        }
        return promotion;
    }

    async getPromotionBasedPosts(): Promise<PostInterface[]> {
        try {
            return await this.postModel
              .find()
              .populate('author', ['firstname', 'lastname', 'promotions'])
              .sort({ 'author.promotions': 'desc' })
              .exec();
        } catch (error) {
            throw new InternalServerErrorException('Unable to fetch posts');

        }

    }
}
