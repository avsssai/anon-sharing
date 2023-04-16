export default function YoutubeMusicEmbed({ link }: { link?: string }) {
	return (
		<div className='aspect-w-16 aspect-h-9'>
			<iframe
				src='https://music.youtube.com/embed/playlist?list=OLAK5uy_nPZr-8ZG7BnYX9HKU6qzVV6pNLKdPzUfE'
				width='100%'
				height='380'
				frameBorder='0'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				allowFullScreen></iframe>
		</div>
	);
}
