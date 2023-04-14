import Layout from "@/Components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { PrismaClient, User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

interface Data {
	user: User | null;
}

export default function Share({
	user,
	loggedIn,
}: {
	user: User;
	loggedIn: boolean;
}) {
	const router = useRouter();

	return (
		<Layout>
			<div className='flex flex-col gap-4'>
				<h1>Welcome {user.name}</h1>
				<div>
					<h3>
						Please use the below URL to share with your friends and
						colleagues to get anonymous clips!
					</h3>
					<div>{user?.userID}</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req } = context;
	const { cookies } = req;
	const prisma = new PrismaClient();
	try {
		const user = await prisma.user.findUnique({
			where: { userID: cookies.user_id as string },
		});
		return {
			props: { user, loggedIn: true },
		};
	} catch (error) {
		return {
			redirect: {
				destination: "/",
				permanent: true,
			},
		};
	}
}
