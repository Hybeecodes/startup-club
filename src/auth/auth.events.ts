import { EventEmitter } from 'events';
import { StrictEventEmitter } from 'nest-emitter';
import { User } from 'src/users/user.interface';

interface AuthEvents {
    onRegistration: User;
    onActivation: string;
    onForgotPassword: string;
}

export type AuthEventEmitter = StrictEventEmitter<EventEmitter, AuthEvents>;
