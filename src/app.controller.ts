import { Controller, Get, Request, UseGuards, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './DTOs/CreateUser.dto';
import { SuccessRes } from './utils/ResFormatter';
import { ActivateUserDto } from './DTOs/ActivateUser.dto';
import { ForgotPasswordDto } from './DTOs/ForgotPassword.dto';

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

  @Post('register')
  async register(@Body() postData: CreateUserDto) {
    const result = await this.authService.createUser(postData);
    return SuccessRes(result);
  }

  @Post('activate-account')
  async activateAccount(@Body() postData: ActivateUserDto) {
    const result = await this.authService.activateUser(postData);
    return SuccessRes(result);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() postData: ForgotPasswordDto) {

  }

  @Post('reset-password')
  async resetPassword() {

  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  async changePassword() {

  }

}
