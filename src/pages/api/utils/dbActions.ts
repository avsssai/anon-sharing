import prisma from "../../../../prisma";
export async function getUser(userId: string) {
	const user = await prisma.user.findUnique({
		where: {
			userID: userId,
		},
	});
	return user;
}
