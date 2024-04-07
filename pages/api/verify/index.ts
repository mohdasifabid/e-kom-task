import authenticateUser from '@/app/lib/authenticaton';
import createUser from '@/app/lib/createUser';
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    name: string;
    email: string;
    password: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (req.method === "POST") {
        try {
            const { name, email, password }: User = req.body;
            const { usersList, newUser } = await createUser(name, email, password);
            if (name && email && password) {
                res.status(201).json({
                    newUser, success: "Account created successfully!"
                })
            } else {
                res.status(401).json({ error: "Account creation failed!" });
            }

        } catch (error) {
            res.status(500).json({ message: 'Failed to create user' });
        }
    } else {
        res.status(405).end();
    }
};

export default handler;
