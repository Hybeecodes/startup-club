import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as nanoid from 'nanoid';
import { InjectEventEmitter } from 'nest-emitter';
import { AuthEventEmitter } from 'src/auth/auth.events';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(
      @InjectModel('User')
      public readonly userModel: Model<User>,
      @InjectEventEmitter() private readonly authEmitter: AuthEventEmitter,
      private readonly emailService: EmailService,
        ) {}

    onModuleInit() {
        this.authEmitter.on('onRegistration', async username => this.onRegistration(username));
        this.authEmitter.on('onForgotPassword', async email => this.onForgotPassword(email));
    }
    async findOne(username: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async create(postData): Promise<User | undefined> {
        // check if user exists
        const user = await this.userModel.findOne({
            $or: [
                { username: postData.username},
                { email: postData.email },
            ],
        });
        if (user) {
            throw new ConflictException('User exists already');
        }
        let newUser = new this.userModel(postData);
        newUser.activation_token = nanoid();
        newUser = await newUser.save();
        if (!newUser) {
            throw new InternalServerErrorException('Unable to Create New User');
        }
        return newUser;
    }

    async activateUser(email: string, token: string) {
        // check if email exists
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new BadRequestException('User with email does not exist');
        }
        if (user.activation_token !== token) {
            throw new BadRequestException('Invalid token supplied');
        }
        // update activation status
        user.active = true;
        user.activation_token = null;
        if (!await user.save()) {
            throw new InternalServerErrorException('Unable to activate user');
        }
        return true;
    }

    private async onRegistration(user: User) {
        this.emailService.sendRegistrationMail(user.email, user.username);
    }

    private async onForgotPassword(email: string) {
        this.emailService.sendForgotPasswordEmail(email);
    }
}
