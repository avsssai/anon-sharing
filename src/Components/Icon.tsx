import { cn } from "@/utils/utils";
import Image from "next/image";

export default function Icon({
	src,
	alt,
	size = 48,
}: {
	src: string;
	alt: string;
	size?: number;
}) {
	return (
		<div className={cn("relative", `h-[${size}px] w-[${size}px]`)}>
			<Image src={src} alt={alt} fill className='object-contain' />
		</div>
	);
}
