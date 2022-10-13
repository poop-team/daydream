import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const message: string = req.body.message;

	res.json(message.split('').reverse().join(''));
}
