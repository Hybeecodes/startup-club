import { EventEmitter } from 'events';
import { StrictEventEmitter } from 'nest-emitter';

interface AuthEvents {
    onRegistration: string;
    onActivation: string;
}

export type AuthEventEmitter = StrictEventEmitter<EventEmitter, AuthEvents>;