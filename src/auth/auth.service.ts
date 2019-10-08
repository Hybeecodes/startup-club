import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.interface';
import * as bcrypt from 'bcryptjs';
import { InjectEventEmitter } from 'nest-emitter';
import { AuthEventEmitter } from './auth.events';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        @InjectEventEmitter() private readonly authEmitter: AuthEventEmitter,
        ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username);
        if(user && bcrypt.compareSync(password, user.password)) {
            return user;
        }
        return null;
    }

    async createUser(postData: User): Promise<User> {
        const user = await this.userService.create(postData);
        this.authEmitter.emit('onRegistration', user);
        return user;
    }

    async login(user: any) {
        const payload = {
            username: user.username,
            sub: user.id
        };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async activateUser(postData) {
        const { email, token } = postData;
        return await this.userService.activateUser(email, token);
    }
}
