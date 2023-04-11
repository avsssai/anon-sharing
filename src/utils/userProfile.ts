import { PrismaClient } from "@prisma/client";
export const getUserProfile = async (id: string) => {
	const prisma = new PrismaClient();
	try {
		await prisma.user.findUnique({
			where: { id },
		});
	} catch (err: any) {
		console.log(err.message);
	}
};
