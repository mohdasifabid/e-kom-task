import type { NextApiRequest, NextApiResponse } from 'next'
import { categories } from "@/app/lib/placeholder-data";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const { pageNumber = 1, recordsPerPage = 6 } = req.query;
        const startIndex = (Number(pageNumber) - 1) * Number(recordsPerPage);
        const paginatedCategories = categories.slice(startIndex, startIndex + Number(recordsPerPage));
        const totalCategories = categories.length;
        const totalPages = Math.ceil(totalCategories / Number(recordsPerPage));
        res.status(200).json({ categories: paginatedCategories, recordsPerPage, pageNumber, totalPages })
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}


export default handler