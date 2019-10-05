import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username);
        if(user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
