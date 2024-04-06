import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, verificationToken } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email address",
      text: `Hello,\n\nPlease use the following verification code to verify your email address: ${verificationToken}\n\nPlease do not reply to this email. If you have any questions or issues, contact our support team at support@example.com.\n\nThank you.`,
      headers: {
        "Reply-To": process.env.EMAIL_USER,
      },
    };

    try {
      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ message: "Email sent successfully", otp: verificationToken });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
