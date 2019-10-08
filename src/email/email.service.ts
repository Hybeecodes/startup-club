import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    public sendRegistrationMail(email): void {
        this.mailerService
        .sendMail({
            to: email,
            from: 'noreply@startupclub.com',
            subject: 'Welcome to the Startup Club',
            text: 'Welcome',
            html: '<b>Welcome</b>'
        })
        .then(() => {
            console.log('sent');
        })
        .catch((err) => {
            console.log('error', err);
        });
    }
}
