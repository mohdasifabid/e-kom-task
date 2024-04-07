import authenticateUser from '@/app/lib/authenticaton';
import createUser from '@/app/lib/createUser';
import { registerUser } from '@/helpers/users';
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    name: string;
    email: string;
    password: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (req.method === "POST") {
        try {
            const response = await registerUser(req.body)
            res.status(201).json({ response })
        } catch (error) {
            res.status(405).json({
                message: "Method Not Allowed"
            })
        }
    } else {
        res.status(405).end();
    }
};

export default handler;
