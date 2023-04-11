import { NextApiRequest, NextApiResponse } from "next";
import { verify, sign } from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET = process.env.JWT_SECRET as string;

export const verifyCSRFToken = (handler: any) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			// check the token
			const { csrf_token } = req.headers;
			verify(csrf_token as string, SECRET);
			return await handler(req, res);
		} catch (error) {
			return res.status(403).json({ message: "Invalid CSRF token." });
		}
	};
};

export const generateCSRFSignedCookie = () => {
	const csrf_token = sign({}, SECRET, {
		expiresIn: "1y",
	});
	const csrfCookie = serialize("csrf_token", csrf_token, {
		httpOnly: true,
		sameSite: "strict",
		maxAge: 365 * 60 * 60 * 24,
		path: "/",
	});
	return csrfCookie;
};
