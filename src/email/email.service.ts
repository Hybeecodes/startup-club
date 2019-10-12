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
              username,
            },
        })
        .then(() => {
          // tslint:disable-next-line:no-console
            console.log('sent');
        })
        .catch((err) => {
          // tslint:disable-next-line:no-console
            console.log('error', err);
        });
    }

  public sendForgotPasswordEmail(email: string): void {
    this.mailerService
      .sendMail({
        to: email,
        from: 'noreply@startupclub.com',
        subject: 'Startup Club - Forgot Password',
        template: 'forgot-password',
        context: {
          ForgotPasswordLink: `https://startupclub.com/forgotPassword?e=${email}`,
        },
      })
      .then(() => {
        // tslint:disable-next-line:no-console
        console.log('sent');
      })
      .catch((err) => {
        // tslint:disable-next-line:no-console
        console.log('error', err);
      });
  }
}
