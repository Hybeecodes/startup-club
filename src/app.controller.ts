import { Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    req.user;
  }
}
