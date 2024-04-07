import { db } from '@/helpers/db';
import type { NextApiRequest, NextApiResponse } from 'next'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!db.initialized)
        await db.initialize();

    if (req.method === "GET") {
        const { pageNumber = 1, recordsPerPage = 6 } = req.query;


        try {
            const page = Number(pageNumber);
            const limit = Number(recordsPerPage)
            const offset = (page - 1) * limit;
            const items = await db.Category.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });

            // Get total count for pagination
            const totalCount = await db.Category.count();


            res.status(200).json({ categories: items, recordsPerPage: limit, pageNumber: page, totalPages: Math.ceil(totalCount / limit) })

        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}


export default handler