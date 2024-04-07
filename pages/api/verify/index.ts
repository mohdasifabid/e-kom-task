import { db } from '@/helpers/db';
import { verifyUser } from '@/helpers/users';
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    email: string;
    otp: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (!db.initialized)
    await db.initialize();
    if (req.method === "POST") {
        try {
            const foundUser = await db.User.findByPk(req.body.id)

            if (Number(foundUser?.otp) === Number(req.body.otp)) {
                foundUser.isVerified = true;
            }
            delete foundUser.otp

            await foundUser.save();
            res.status(200).json(foundUser)
        } catch (error) {
            res.status(500).json({ message: 'Failed to verify user' });
        }
    } else {
        res.status(405).end();
    }
};

export default handler;
