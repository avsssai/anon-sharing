import React from "react";
import Icon from "./Icon";

interface IProps {
	children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
	return (
		<main className='max-w-md mx-auto px-4'>
			<header className='flex  mb-20 rounded-lg border border-b-red-300 font-bold items-center justify-center gap-2 text-xl'>
				Secret Song Dedicate!
				<Icon alt='Youtube icon' src='/YouTube.svg' />
				<div className='ml-[-1.5rem]'>
					<Icon alt='Spotify icon' src='/Spotify.svg' />
				</div>
			</header>
			{children}
		</main>
	);
};

export default Layout;
