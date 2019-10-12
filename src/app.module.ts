import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { EventEmitter } from 'events';
import { NestEmitterModule } from 'nest-emitter';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NestEmitterModule.forRoot(new EventEmitter()),
    MongooseModule.forRoot('mongodb://localhost/startup-club'),
    MailerModule.forRoot({
      transport: `smtps://${}:${}@smtp.gmail.com`,
      defaults: {
        from: '"Startup Club" <hello@startupclub.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    PostsModule,
    EmailModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService, ConfigService],
})
export class AppModule {}
