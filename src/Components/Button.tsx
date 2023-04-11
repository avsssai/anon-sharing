interface IProps {
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
}

const Button = ({ type = "button", ...props }: IProps) => {
	return (
		<button
			type={type}
			className='w-full p-2 text-center bg-red-600 text-xl text-white rounded-lg font-bold mt-4 hover:bg-red-500'>
			{props.children}
		</button>
	);
};

export default Button;
