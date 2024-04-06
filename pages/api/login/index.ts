import authenticateUser from "@/app/lib/authenticaton";
import { usersList } from "@/app/lib/placeholder-data";
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string,
  
}
const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {

    if (req.method === "POST") {
        const { email, password } = req.body;
        const currentUser = usersList?.find((item: { id: Number, email: string, password: string | number }) => item.email === email)
        const token  = authenticateUser(email, password);
        if (token) {
            res.status(200).json({ token, currentUser, success: "Loggedin Successfully!" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } else {
        res.status(405).end();
    }
};

export default handler;
