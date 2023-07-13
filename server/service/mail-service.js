import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Ссылка аккаунта на ${process.env.API_URL}`,
      text: '',
      html: `
        <div>
          <h1>Для аккаунта на ${process.env.API_URL}</h1>
          <a href="${link}">${link}</a>
        </div>
      `
    })
  }

  async sendPasswordMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Смена пароля на ${process.env.API_URL}`,
        text: '',
        html: `
        <div>
          <h1>Для смены пароля перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `
      })
      return true
    } catch (e) {
      console.log(e)
      return
    }
  }

  async sendInvoiceMail(to, file, res) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Счет на оплату от ${process.env.API_URL}`,
        text: '',
        html: `
        <div>
          <h1>Счет на оплату во вложении.</h1>
              </div>
      `,
        attachments: [{
          filename: file.filename,
          path: file.path
        }]
      })
      return res.sendStatus(200)
    } catch (e) {
      console.log(e)
      return
    }
  }

  async sendAccountMail(to) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Начисление баллов на ${process.env.API_URL}`,
        text: '',
        html: `
        <div>
          <h3>Баллы зачислены на Ваш счет</h3>
                  </div>
      `
      })
      return true
    } catch (e) {
      console.log(e)
      return
    }
  }



}


export default new MailService()