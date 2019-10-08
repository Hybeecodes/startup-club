import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { EventEmitter } from 'events';
import { NestEmitterModule } from 'nest-emitter';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NestEmitterModule.forRoot(new EventEmitter()),
    MongooseModule.forRoot('mongodb://localhost/startup-club'),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
