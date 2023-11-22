import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import appRootPath from 'app-root-path';
import log from '../config/winston';

function renderTemplate(view, viewModel) {
  const source = fs.reafFileSync(
    path.join(appRootPath.toString(), 'src', 'mails', `${view}.hbs`),
    'utf8'
  );
  const template = Handlebars.compile(source);
  const htmlContent = template(viewModel);
  return htmlContent;
}

// Class MailSender
class MailSender {
  // Constructor
  constructor(options) {
    if (!options) throw new Error('Need options to create a Mail Sender');
    this.transporter = nodemailer.createTransport(options);
    this.mail = {
      from: '',
      to: '',
      subject: '',
      text: 'Email not provider',
      html: '<h1>Mail</h1><p>Email not provider</p>',
    };
  }

  // Methods
  async sendMail(view, viewModel, text) {
    // Check if exist view, viewModel and text
    if (!view) throw new Error('Need view to send a mail');
    if (!viewModel) throw new Error('Need viewModel to send a mail');
    if (!text) throw new Error('Need text to send a mail');

    // Check of mail properties are not empty string
    if (this.mail.from === '')
      throw new Error('Need from property to send a mail');
    if (this.mail.to === '') throw new Error('Need to property to send a mail');
    if (this.mail.subject === '')
      throw new Error('Need subject property to send a mail');

    // Sending Mail
    try {
      this.mail.html = renderTemplate(view, viewModel);
      this.mail.text = text;
      return this.transporter.sendMail(this.mail);
    } catch (error) {
      log.error(error);
      return null;
    }
  }
}

export default MailSender;
