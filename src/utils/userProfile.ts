import { PrismaClient } from "@prisma/client";
export const getUserProfile = async (user_id: string) => {
	const prisma = new PrismaClient();
	try {
		const user = await prisma.user.findUnique({
			where: { userID: user_id },
		});
		return user;
	} catch (err: any) {
		console.log(err.message);
	}
};
