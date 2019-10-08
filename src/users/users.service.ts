import { Injectable,
         InternalServerErrorException,
         ConflictException, 
         BadRequestException, 
         OnModuleInit} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as nanoid from 'nanoid';
import { InjectEventEmitter } from 'nest-emitter';
import { AuthEventEmitter } from 'src/auth/auth.events';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class UsersService implements OnModuleInit {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        @InjectEventEmitter() private readonly authEmitter: AuthEventEmitter
        ) {}

    onModuleInit() {
        this.authEmitter.on('onRegistration', async username => this.onRegistration(username));
    }
    async findOne(username: string): Promise<User | undefined> {
        return await this.userModel.findOne({username});
    }

    async create(postData): Promise<User | undefined> {
        // check if user exists
        const user = await this.userModel.findOne({
            $or: [
                { username: postData.username},
                { email: postData.email}
            ]
        });
        if(user) {
            throw new ConflictException('User exists already');
        }
        let newUser = new this.userModel(postData);
        newUser.activation_token = nanoid();
        newUser = await newUser.save();
        if(!newUser) {
            throw new InternalServerErrorException('Unable to Create New User');
        }
        return newUser;
    }

    async activateUser(email: string, token: string) {
        // check if email exists
        const user = await this.userModel.findOne({ email }).exec();
        if(!user) {
            throw new BadRequestException('User with email does not exist');
        }
        if(user.activation_token !== token) {
            throw new BadRequestException('Invalid token supplied');
        }
        // update activation status
        user.active = true;
        user.activation_token = null;
        if(!await user.save()){
            throw new InternalServerErrorException('Unable to activate user');
        }
        return true;
    }

    private async onRegistration(username: string) {
        console.log(`New User with username ${username} just registered`);
    }
}
