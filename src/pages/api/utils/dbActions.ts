import prisma from "../../../../prisma";
export async function getUser(userId: string) {
	const user = await prisma.user.findUnique({
		where: {
			userID: userId,
		},
	});
	return user;
}
export async function getPosts(userId: string) {
	const posts = await prisma.post.findMany({
		where: {
			userID: userId,
		},
	});
	return posts;
}
