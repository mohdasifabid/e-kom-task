import bcrypt from "bcryptjs"
import { db } from "../db";
import { generateOTP } from "@/app/lib/utils";
import { sendOTP } from "../sendOtp";
export async function registerUser(params) {
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" already exists';
    }
    const user = new db.User(params);
    const otp = generateOTP();

    user.otp = otp;
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    await user.save();
    await sendOTP(params?.email, otp);
    return user
}

export async function verifyUser(params) {
    
    const foundUser = await db.User.findByPk(params.id)
    if (!foundUser) {
        throw ("User not found")
    }

    if (Number(foundUser?.otp) === Number(params?.otp)) {
        foundUser.isVerified = true;
    }
    delete foundUser.otp

    await foundUser.save();
    return foundUser
}