import { Controller, Get, Post, Put, UseGuards, Body, Req, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostInterface } from './post.interface';
import { CreatePostDto } from '../DTOs/CreatePost.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getPost(@Body('id') id: string, @Req() req): Promise<PostInterface | undefined> {
        return await this.postsService.findById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createPost(postData: CreatePostDto, @Req() req): Promise<PostInterface> {
        return this.postsService.create(postData, req.user.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    async updatePost(putData: CreatePostDto, @Param('id') postId): Promise<PostInterface> {
        return await this.postsService.update(putData, postId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async deletePost(@Param('id') id: string) {
        return await this.postsService.delete(id);
    }
}
