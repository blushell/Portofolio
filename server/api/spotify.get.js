import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export default defineEventHandler(async () => {
	const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
	const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
	const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

	try {
		// Initialize the Spotify SDK with credentials
		const spotify = SpotifyApi.withClientCredentials(
			SPOTIFY_CLIENT_ID,
			SPOTIFY_CLIENT_SECRET,
			[SPOTIFY_REFRESH_TOKEN]
		);

		// Get the current playback state using the SDK
		const currentTrack = await spotify.player.getCurrentlyPlayingTrack();

		// Handle case where no track is playing
		if (!currentTrack) {
			return {
				data: null,
				error: 'No active playback',
			};
		}

		return {
			data: {
				name: currentTrack.item.name,
				artist: currentTrack.item.artists[0].name,
				album: currentTrack.item.album.name,
				albumArt: currentTrack.item.album.images[0].url,
				progress: currentTrack.progress_ms,
				duration: currentTrack.item.duration_ms,
				isPlaying: currentTrack.is_playing,
			},
			error: null,
		};
	} catch (error) {
		console.error('Spotify API error:', error);

		// Improved error handling with specific status codes
		const statusCode = error.status || 500;
		const errorMessage = error.message || 'Unknown error occurred';

		throw createError({
			statusCode,
			statusMessage: `Spotify API error: ${errorMessage}`,
			data: error,
		});
	}
});
