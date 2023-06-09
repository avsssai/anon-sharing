import { GetServerSidePropsContext, NextPage } from "next";
import jwt from "jsonwebtoken";
import { getPosts, getUser } from "../api/utils/dbActions";
import { User } from "@prisma/client";
import Layout from "@/Components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Result from "@/Components/Result";

interface IProps {
	user: User;
	showResults: boolean;
	userName?: string;
}

interface FormData {
	url: string;
	startTime: string;
	endTime: string;
}

const UserIdPage = ({ user, showResults, userName }: IProps) => {
	console.dir({ user, showResults });
	const router = useRouter();
	console.log(router.query.userId, "query");
	const query = router.query;
	const [formData, setFormData] = useState<FormData>({
		url: "",
		startTime: "",
		endTime: "",
	});

	if (user && showResults) {
		return (
			<Layout>
				<h1 className='text-xl  font-bold flex gap-1'>
					Showing results for{" "}
					<div className='text-red-500'>{user.name}</div>
				</h1>
				<div className=''>
					<Result link='https://open.spotify.com/track/3K9O6TqcIMX8plGkzBARiK?si=9ff2c79725ce4348' />
					<Result link='https://open.spotify.com/playlist/37i9dQZF1DXcBOn0qcyd5C?si=709e221ac2af4a08' />
				</div>
			</Layout>
		);
	}
	const { url, startTime, endTime } = formData;

	const handleFormEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((previousData: FormData) => {
			return {
				...previousData,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(formData),
			headers: { "Content-Type": "application/json" },
		};
		fetch(`/api/share/${query.userId}`, requestOptions);
	};
	return (
		<Layout>
			<h2>Please enter your input for {userName}</h2>
			<div>
				<form onSubmit={handleSubmit}>
					<label htmlFor='url'>
						Enter the YouTube video URL
						<input
							type='text'
							onChange={handleFormEdit}
							value={url}
							name='url'
							className='outline flex'
						/>
					</label>

					<label htmlFor='startTime'>
						Start Time :{" "}
						<input
							type='text'
							name='startTime'
							value={formData.startTime}
							onChange={handleFormEdit}
							className='outline flex'
						/>
					</label>

					<label htmlFor='endTime'>
						End Time :{" "}
						<input
							type='text'
							name='endTime'
							value={formData.endTime}
							onChange={handleFormEdit}
							className='outline flex'
						/>
					</label>
					<button type='submit'>Send</button>
				</form>
			</div>
		</Layout>
	);
};

interface ISub {
	user_id: string;
	name: string;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { req } = context;
	const { cookies } = req;
	const token =
		(req.cookies.jwtToken as string) ||
		(req.headers.authorization?.replace("Bearer ", "") as string);
	const SECRET = process.env.JWT_SECRET as string;
	if (!token) {
		const { userId } = context.query;
		console.log(context.query);
		// console.log(userId);
		const user = await getUser(userId as string);
		return {
			props: {
				user: null,
				showResults: false,
				userName: user?.name,
			},
		};
	}
	try {
		const decoded = jwt.verify(token, SECRET);
		const { user_id, name } = decoded.sub as unknown as ISub;
		const user = await getUser(user_id);
		// const posts = await getPosts
		const posts = await getPosts(user!.id);
		console.log(posts, "posts");
		if (!user || user_id !== context.query.userId) {
			const { userId } = context.query;
			// console.log(userId);
			const user = await getUser(userId as string);
			return {
				props: {
					user: null,
					showResults: false,
					userName: user?.name,
				},
			};
		}
		return {
			props: {
				user,
				showResults: true,
			},
		};
	} catch (err) {
		return {
			props: {
				user: null,
				showResults: false,
			},
		};
	}
}

export default UserIdPage;
