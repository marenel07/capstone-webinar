import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prismadb';
import Link from 'next/link';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  const origin: string =
    process.env.NODE_ENV === 'production'
      ? 'https://ssubc-webinar.vercel.app'
      : 'http://localhost:3000';

  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          verificationToken: hashedToken,
          verificationTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === 'RESET-PASSWORD') {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'dfffd6da203d15',
        pass: '5bd60b3e448440',
      },
    });

    const mailOptions = {
      from: 'ssubc-webinar',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html:
        emailType === 'VERIFY'
          ? `
        <div style="background-color: #f5f5f5; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="color: #000; font-size: 24px; font-weight: 600; margin-bottom: 20px;">Verify your email</h1>
                <p style="color: #000; font-size: 16px; font-weight: 400; margin-bottom: 20px;">Click the button below to verify your email.</p>
                <a href="http://localhost:3000/sign-up/verify-email?token=${hashedToken}" style="color: #fff; background-color: #000; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email</a>
            </div>
        </div>
        `
          : `
        <div style="background-color: #f5f5f5; padding: 20px;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
                <h1 style="color: #000; font-size: 24px; font-weight: 600; margin-bottom: 20px;">Reset your password</h1>
                <p style="color: #000; font-size: 16px; font-weight: 400; margin-bottom: 20px;">Click the button below to reset your password.</p>
                <a href="${origin}/reset-password/${hashedToken}" style="color: #fff; background-color: #000; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Reset Password</a>
            </div>
        </div>
        `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
