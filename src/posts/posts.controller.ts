import { Controller, Get, Post, Put, UseGuards, Body, Req, Param, Delete, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostInterface } from './post.interface';
import { CreatePostDto } from '../DTOs/CreatePost.dto';
import { AuthGuard } from '@nestjs/passport';
import { SuccessRes } from '../utils/ResFormatter';

@UseGuards(AuthGuard('jwt'))
@Controller('api/posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {}

    @Get()
    async getAllPosts() {
        return await this.postsService.findAll();
    }

    @Get()
    async getUserPosts(@Req() req) {
        return await this.postsService.findUserPosts(req.user.userId);
    }

    @Get(':slug')
    async getPost(@Param('slug') slug: string, @Req() req): Promise<PostInterface | undefined> {
        return await this.postsService.findBySlug(slug);
    }

    @Post()
    async createPost(@Body() postData: CreatePostDto, @Req() req): Promise<PostInterface> {
        return this.postsService.create(postData, req.user.userId);
    }

    @Put(':id')
    async updatePost(putData: CreatePostDto, @Param('id') postId): Promise<PostInterface> {
        return await this.postsService.update(putData, postId);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return await this.postsService.delete(id);
    }

    @Post(':postId/promote')
    async promote(@Query('medium') medium, @Param('postId') postId:string, @Req() req) {
        const result = await this.postsService.promote(postId, medium, req.user.userId);
        return SuccessRes(result);
    }
}
