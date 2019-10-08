import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.interface';
import { CreatePostDto } from 'src/DTOs/CreatePost.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('Post')
        private readonly postModel: Model<Post>
    ) {}

    async findById(id: string): Promise<Post | undefined > {
        const post =  await this.postModel.findById(id).exec();
        if(!post) {
            throw new NotFoundException('Post doesn\'t exist');
        }
        return post;
    }

    async create(postData): Promise<Post | undefined> {
        let newPost = new this.postModel(postData);
        newPost = await newPost.save();
        if(!newPost) {
            throw new InternalServerErrorException('Unable to create new Post');
        }
        return newPost;
    }

    async update(postData: CreatePostDto, id: string): Promise<Post | undefined> {
        let post = await this.postModel.findById(id);
        if(!post) {
            throw new NotFoundException('Post doesn\'t exist');
        }
        post.body = postData.body;
        post.title = postData.title;
        const updatedPost = await post.save();
        if(!updatedPost) {
            throw new InternalServerErrorException('Unable to update post');
        }
        return updatedPost;
    }

    async delete(id: string) {
        let deleted = this.postModel.findByIdAndRemove(id);
        if(!deleted) {
            throw new InternalServerErrorException('Unable to delete post');
        }
        return deleted;
    }
}
