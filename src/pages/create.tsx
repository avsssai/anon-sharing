import Button from "@/Components/Button";
import ImageComponent from "@/Components/Image";
import Layout from "@/Components/Layout";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Create() {
	const router = useRouter();
	const [name, setName] = useState("");
	async function createUserProfile(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = {
			firstName: "shiva",
			lastName: "addanki1",
			email: "avsssai@gmail.com",
			avatar: "https://github.com/avsssai.png",
		};
		const res = await fetch("/api/hello", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		router.push("/share");
		if (!res.ok) {
			throw new Error("Error posting data");
		}
		return res.json();
	}

	async function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		const res = await fetch("/api/share", {
			method: "POST",
			body: JSON.stringify({
				name,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res.ok) {
			router.push("/share");
		} else {
			console.error(res.statusText);
		}
	}
	return (
		<Layout>
			<ImageComponent alt='' src='/video2.svg' fill />
			<div>
				<form
					className='flex flex-col gap-2 font-semibold'
					onSubmit={handleSubmit}
					method='POST'>
					<label htmlFor='name'>Enter your name to continue.</label>
					<input
						type='text'
						name='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						className='block p-3 outline outline-1 rounded-md'
					/>
					<Button type='submit'>Continue</Button>
				</form>
			</div>
		</Layout>
	);
}
