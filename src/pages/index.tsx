import Head from "next/head";
import Link from "next/link";
import Button from "../Components/Button";
import Layout from "@/Components/Layout";
import ImageComponent from "@/Components/Image";
export default function Home() {
	return (
		<>
			<Head>
				<title>Secret Song!</title>
				<meta
					name='description'
					content='Secret song dedication app.'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<ImageComponent alt='' src='/video.svg' fill />
				<div className='text-center'>
					<h3 className='font-bold text-lg'>Create your</h3>
					<div className='font-bold text-2xl text-red-500'>
						Secret Song Dedication Link
					</div>
					<div className='font-bold text-lg'>
						and share it with your friends
					</div>
				</div>
				<Link href={"/create"}>
					<Button>Create</Button>
				</Link>
				<div className='text-center mt-4'>
					People will send you Spotify and YouTube Music links and
					won&apos;t know who!
				</div>
			</Layout>
		</>
	);
}
