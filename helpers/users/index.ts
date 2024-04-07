import bcrypt from "bcryptjs"
import { db } from "../db";
export async function registerUser(params) {
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" already exists';
    }
    const user = new db.User(params);
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    await user.save();
    return user
}