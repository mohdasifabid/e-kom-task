import authenticateUser, { generateToken } from "@/app/lib/authenticaton";
import { usersList } from "@/app/lib/placeholder-data";
import { registerUser } from "@/helpers/users";
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcryptjs"
import { db } from "@/helpers/db";
type ResponseData = {
    message: string,

}
const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    if (!db.initialized)
        await db.initialize();

    if (req.method === "POST") {
        try {

            const user = await db.User.scope("withHash").findOne({ where: { email: req.body.email } });
            const token = generateToken(user.id)
            if (!(user && bcrypt.compareSync(req.body.password, user.hash))) {
                throw 'Email or password is incorrect';
            }
            res.status(201).json({ email: user.email, id: user.id, name: user.name, isVerified: user.isVerified, token })

        } catch (error) {
            res.status(400).json({
                message: "Failed to login"
            })
        }
    } else {
        res.status(405).json({
            message: "Method Not Allowed"
        })
    }
};

export default handler;
