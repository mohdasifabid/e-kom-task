import nodemailer from "nodemailer";

export function sendOTP(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email address",
        text: `Hello,\n\nPlease use the following verification code to verify your email address: ${otp}\n\nPlease do not reply to this email. If you have any questions or issues, contact our support team at support@example.com.\n\nThank you.`,
        headers: {
          "Reply-To": process.env.EMAIL_USER,
        },
      };
    const mailConfigOptions = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    };

    const transporter = nodemailer.createTransport(mailConfigOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}