import SpotifyEmbed from "./Spotify";
import YoutubeMusicEmbed from "./YoutubeMusic";

type LinkType = "youtube" | "spotify" | null;
interface Link {
	link: string;
}

export default function Result({ link }: { link: string }) {
	const identifyMusicService = (url: string): LinkType | null => {
		const spotifyRegex = /^https?:\/\/open\.spotify\.com\/[a-zA-Z0-9\-]+/;
		const youtubeRegex =
			/^https?:\/\/music\.youtube\.com\/watch\?v=[a-zA-Z0-9\-]+/;

		if (spotifyRegex.test(url)) {
			return "spotify";
		} else if (youtubeRegex.test(url)) {
			return "youtube";
		} else {
			return null;
		}
	};
	const linkType: LinkType = identifyMusicService(link);
	const spotifyEmbedLinkMaker = (spotifyLink: string) => {
		const match = spotifyLink.match(/track\/([a-zA-Z0-9]+)(\?|$)/);
		const songId = match && match[1];
		return songId;
	};
	return (
		<div>
			<div className='relative'>
				<div className='absolute text-2xl font-bold italic text-white ml-[-0.1rem]'>
					1
				</div>
				<SpotifyEmbed link={link} />
			</div>
		</div>
	);
}

// https://open.spotify.com/track/21d3KE855pG8CFvKRWjlsL?si=a8211511cc1b4a92
// https://open.spotify.com/track/3K9O6TqcIMX8plGkzBARiK?si=9ff2c79725ce4348

// https://open.spotify.com/embed/track/21d3KE855pG8CFvKRWjlsL?utm_source=generator
