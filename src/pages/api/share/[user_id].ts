import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		console.log("fired@");
		const prisma = new PrismaClient();
		const { user_id } = req.query;
		const dbBody = { ...req.body };
		const post = await prisma.post.create({
			data: {
				...req.body,
				user: {
					connect: { userID: user_id },
				},
			},
		});
		return res.status(200).json({ data: post });
	} catch (error: any) {
		console.error(error.message);
	}
}

// const { user_id } = req.query;
// const cookies = req.headers.cookie;
// let cookieObj = cookies?.split(";").reduce((acc: any, cookie: any) => {
// 	let [name, value] = cookie.trim().split("=");
// 	acc[name] = value;
// 	return acc;
// }, {});
// const { user_id } = cookieObj;
// const prisma = new PrismaClient();
// console.log(user_id, "headers");
// try {
// 	const user = await prisma.user.findUnique({
// 		where: { userID: user_id as string },
// 	});
// 	return res.status(200).json({ user });
// } catch (error: any) {
// 	console.log(error.message);
// }
