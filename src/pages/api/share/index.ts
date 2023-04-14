import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import crypto from "crypto";
import { serialize } from "cookie";
// import { generateCSRFSignedCookie } from "../utils/csrfProtection";
import csrf from "csrf";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const tokens = new csrf();
const SECRET = process.env.JWT_SECRET as string;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User | User[] | { message: string }>
) {
	if (req.method === "GET") {
	} else if (req.method === "POST") {
		// create a csrf token
		const randomBytes = crypto.randomBytes(8);
		const userID = randomBytes.toString("hex");
		const csrf_token = tokens.create(SECRET);
		const { name } = req.body;
		const jwtToken = jwt.sign(
			{ sub: { user_id: userID, name }, csrf: csrf_token },
			SECRET
		);
		console.log("fired2");
		// make the entry into prisma

		// const csrf_token = crypto.randomUUID();
		const newUser = { name, csrf_token, userID };
		const user = await prisma.user.create({ data: newUser });

		const userIdCookie = serialize("user_id", userID, {
			path: "/",
			httpOnly: true,
			maxAge: 365 * 60 * 60 * 24,
			sameSite: "strict",
		});

		const jwtCookie = serialize("jwtToken", jwtToken, {
			path: "/",

			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 365 * 60 * 60 * 24,
		});

		const csrfCookie = serialize("csrf_token", csrf_token, {
			path: "/",

			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 365 * 60 * 60 * 24,
		});

		res.setHeader("Set-Cookie", [userIdCookie, csrfCookie, jwtCookie]);

		console.log({ name, csrf_token });
		return res.status(200).json(user);
	} else {
		res.status(405).json({ message: "Method not allowed." });
	}
}
