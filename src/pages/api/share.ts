import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import crypto from "crypto";
import { serialize } from "cookie";
import { generateCSRFSignedCookie } from "./utils/csrfProtection";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User | User[] | { message: string }>
) {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed." });
	}
	// make the entry into prisma
	const { name } = req.body;
	const csrf_token = crypto.randomUUID();
	const randomBytes = crypto.randomBytes(8);
	const userID = randomBytes.toString("hex");
	const newUser = { name, csrf_token, userID };
	const user = await prisma.user.create({ data: newUser });
	// Cookies.set("user_id", userID, {
	// 	expires: 365,
	// 	secure: process.env.NODE_ENV === "production",
	// 	sameSite: "strict",
	// });
	const userIdCookie = serialize("user_id", userID, {
		path: "/",
		httpOnly: true,
		maxAge: 365 * 60 * 60 * 24,
		sameSite: "strict",
	});
	// const csrfTokenCookie = serialize("csrf_token", csrf_token, {
	// 	path: "/",
	// 	httpOnly: true,
	// 	maxAge: 365 * 60 * 60 * 24,
	// 	sameSite: "strict",
	// });
	res.setHeader("Set-Cookie", [userIdCookie, generateCSRFSignedCookie()]);

	console.log({ name, csrf_token });
	return res.status(200).json(user);
}
