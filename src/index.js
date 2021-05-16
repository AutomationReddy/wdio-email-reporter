const WDIOReporter = require(`@wdio/reporter`).default;
const nodemailer = require('nodemailer')

class EmailReporter extends WDIOReporter {

    constructor(options) {
        super(options);
        this.options.host = options.host || 
                            console.error(`[email-reporter] Host name is required to send an email`);
        this.options.port = options.port ||
                            console.error(`[email-reporter] Port number is required to send an email`);
        this.options.secure = options.secure || false
        this.options.auth = this.options.secure && options.auth.user && options.auth.pass ? options.auth : console.error(`[email-reporter] Authentication is required`);
        this.options.fromEmail = options.fromEmail || console.error(`[email-reporter] From email is required`);
        this.options.toEmail = options.toEmail || console.error(`[email-reporter] To email is required`);
        this.options.subject = options.subject || `WebdriverIO Test Execution Report`;
        this.options.emailOnlyOnFailure = options.emailOnlyOnFailure || false;
        this.options.title = options.title || `WebdriverIO Test Results`;
        this.totalSuites = 0;
        this.totalTests = 0;
        this.isFailed = false;
    }

    onRunnerEnd(runner) {
        console.log(this.suites[0].tests);
        // this.sendEmail();
    }

    async sendEmail() {
        let authentication = {};
        if(this.options.secure) {
            authentication.secure=this.options.secure;
            authentication.auth = {
                user: this.options.auth.user,
                pass: this.options.auth.pass
            }
        } else {
            authentication.secure = this.options.secure
        }

        let transporter = nodemailer.createTransport({
          host: this.options.host,
          port: this.options.port,
          ...authentication
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: this.options.fromEmail, // sender address
          to: this.options.toEmail, // list of receivers
          subject: this.options.subject, // Subject line
          html: htmlContent() // html body
        })
        console.log('Message sent: %s', info.messageId)
    }
      
}

module.exports = EmailReporter;