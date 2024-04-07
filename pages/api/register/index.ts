import { registerUser } from '@/helpers/users';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/helpers/db';
import authenticateUser, { generateToken } from '@/app/lib/authenticaton';
type User = {
    name: string;
    email: string;
    password: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (!db.initialized)
        await db.initialize();

    if (req.method === "POST") {
        try {
            const user = await registerUser(req.body)
            const token = generateToken(user.id)
            res.status(201).json({ ...user, token})

        } catch (error) {
            res.status(400).json({
                message: "Failed to register the user"
            })
        }
    } else {
        res.status(405).json({
            message: "Method Not Allowed"
        })
    }
};

export default handler;
