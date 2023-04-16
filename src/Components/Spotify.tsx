import React from "react";

function EmbedSpotifyLink({ link }: { link: string }) {
	// Regex to match Spotify track links
	const trackRegex =
		/^https?:\/\/(?:open\.)?spotify\.com\/track\/([a-zA-Z0-9]+)(.*)?$/;

	// Regex to match Spotify album links
	const albumRegex =
		/^https?:\/\/(?:open\.)?spotify\.com\/album\/([a-zA-Z0-9]+)(.*)?$/;
	// Regex to match Spotify playlist links
	const playlistRegex =
		/^https?:\/\/(?:open\.)?spotify\.com\/playlist\/([a-zA-Z0-9]+)(.*)?$/;
	console.log(trackRegex.test(link));
	// Check if link matches a track, album, or playlist regex
	if (trackRegex.test(link)) {
		const trackId = trackRegex.exec(link)![1];
		return (
			<iframe
				src={`https://open.spotify.com/embed/track/${trackId}`}
				width='100%'
				height='80'
				//   frameborder="0"
				allowTransparency={true}
				allow='encrypted-media'></iframe>
		);
	} else if (albumRegex.test(link)) {
		const albumId = albumRegex.exec(link)![1];
		return (
			<iframe
				src={`https://open.spotify.com/embed/album/${albumId}`}
				width='100%'
				height='380'
				// frameborder="0"
				allowTransparency={true}
				allow='encrypted-media'></iframe>
		);
	} else if (playlistRegex.test(link)) {
		const playlistId = playlistRegex.exec(link)![1];
		return (
			<iframe
				src={`https://open.spotify.com/embed/playlist/${playlistId}`}
				width='100%'
				height='380'
				//   frameborder="0"
				allowTransparency={true}
				allow='encrypted-media'></iframe>
		);
	} else {
		return <h1>Not a spotify link</h1>;
	}

	// Link doesn't match a Spotify link regex, return empty string
}

export default EmbedSpotifyLink;
