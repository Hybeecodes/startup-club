import { Controller, Get, Request, UseGuards, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './DTOs/CreateUserDto';
import { User } from './users/user.interface';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    console.log(req);
    return req.user;
  }

  @Post('register')
  async register(@Body() postData: CreateUserDto) {
    return await this.authService.createUser(postData);
  }
}
