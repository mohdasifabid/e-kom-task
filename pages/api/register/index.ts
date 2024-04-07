import { registerUser } from '@/helpers/users';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/helpers/db';
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
            const response = await registerUser(req.body)
            res.status(201).json({ response })
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
