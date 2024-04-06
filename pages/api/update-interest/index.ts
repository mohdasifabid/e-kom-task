import type { NextApiRequest, NextApiResponse } from 'next'
import { categories } from "@/app/lib/placeholder-data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PUT") {
        const { categoryId, interest } = req.body;
        const categoryIndex = categories.findIndex(category => category.id === categoryId);
        if (categoryIndex !== -1) {
            categories[categoryIndex].interested = interest;
            res.status(200).json({ success: true, message: `Interest status of category ${categoryId} updated to ${interest}`, categories });
        } else {
            res.status(404).json({ success: false, message: `Category with ID ${categoryId} not found.` });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}


export default handler