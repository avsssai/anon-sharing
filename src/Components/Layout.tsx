import { Youtube } from "lucide-react";
import React from "react";

interface IProps {
	children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
	return (
		<main className='max-w-md mx-auto px-4'>
			<header className='flex  mb-20 rounded-lg border border-b-red-300 font-bold items-center justify-center gap-2 text-red-500 text-xl'>
				Secret YouTube link
				<Youtube size={36} />
			</header>
			{children}
		</main>
	);
};

export default Layout;
