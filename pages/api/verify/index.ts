import { verifyUser } from '@/helpers/users';
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    email: string;
    otp: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (req.method === "POST") {
        try {
          const user = await verifyUser(req.body)
           res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: 'Failed to verify user' });
        }
    } else {
        res.status(405).end();
    }
};

export default handler;
