import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendRegistrationMail(email: string, username: string): void {
        this.mailerService
        .sendMail({
            to: email,
            from: 'noreply@startupclub.com',
            subject: 'Welcome to the Startup Club',
            template: 'welcome',
            context: {
                username: username
            }
        })
        .then(() => {
            console.log('sent');
        })
        .catch((err) => {
            console.log('error', err);
        });
    }
}
