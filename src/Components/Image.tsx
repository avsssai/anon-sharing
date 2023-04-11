import Image from "next/image";

interface IProps {
	src: string;
	alt: string;
	fill?: boolean;
	height?: number;
	width?: number;
}

const ImageComponent = (props: IProps) => {
	return (
		<div className='relative w-full h-[200px] md:h-[300px] mb-12'>
			<Image src={props.src} alt={props.alt} fill />
		</div>
	);
};

export default ImageComponent;
