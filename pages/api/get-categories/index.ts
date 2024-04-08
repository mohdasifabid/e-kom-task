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
            const items = await db.Category.findAll();
            const totalCount = await db.Category.count();

            res.status(200).json({ categories: items, recordsPerPage: limit, pageNumber: page, totalPages: Math.ceil(totalCount / limit) })

        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else if (req.method === "POST") {
        try {
            const category = await new db.Category(req.body)
            await category.save()
            res.status(201).json(category)
        } catch (error) {
            res.status(405).json({ success: false, message: 'Bad Request' });
        }

    }
    else if (req.method === "PATCH") {
        try {
            const itemToUpdate = await db.Category.findOne({
                where: {
                    id: req.body.id,
                },
            });

            if (!itemToUpdate) {
                console.log('Item not found');
                return;
            }

            await itemToUpdate.update({
                interested: req.body.interested,
            });
            res.status(200).json(itemToUpdate)
        } catch (error) {
            res.status(405).json({ success: false, message: 'Bad Request' });
        }

    }
    else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}


export default handler