<template>
	<div class="space-y-6">
		<!-- Now Playing Section -->
		<div class="space-y-4">
			<div v-if="loading" class="text-dracula-purple animate-pulse">
				Fetching music status...
			</div>

			<div v-else-if="error" class="text-dracula-red">
				{{ error }}
			</div>

			<div v-else-if="currentTrack" class="space-y-2">
				<div class="flex items-center gap-4">
					<img
						:src="currentTrack.albumArt"
						:alt="currentTrack.album"
						class="w-16 h-16 rounded shadow-lg"
					/>
					<div class="space-y-1">
						<div class="text-dracula-green font-bold">
							Now Playing: {{ currentTrack.name }}
						</div>
						<div class="text-dracula-purple">
							{{ currentTrack.artist }}
						</div>
						<div class="text-dracula-comment text-sm">
							{{ currentTrack.album }}
						</div>
						<div class="text-dracula-cyan text-sm">
							{{ currentTrack.progress }} / {{ currentTrack.duration }}
						</div>
					</div>
				</div>
				<div class="flex items-center gap-2 text-dracula-comment">
					<span class="text-dracula-pink">♪</span>
					Playing on Spotify
				</div>
			</div>

			<div v-else class="space-y-2">
				<div class="text-dracula-comment">No music playing right now</div>
				<div class="text-dracula-purple text-sm">
					<span class="text-dracula-pink">♪</span>
					Spotify is idle
				</div>
			</div>
		</div>

		<!-- Playlists Section -->
		<div class="space-y-4">
			<div
				class="text-dracula-purple font-bold border-b border-dracula-current pb-2"
			>
				Featured Playlists (Page {{ currentPage }}/{{ totalPages }})
			</div>

			<div class="space-y-2">
				<div
					v-for="playlist in paginatedPlaylists"
					:key="playlist.name"
					class="h-[32px] flex items-center"
				>
					<template v-if="!playlist.empty">
						<a
							:href="playlist.url"
							target="_blank"
							class="flex items-center gap-3 group w-full hover:bg-dracula-current p-2 rounded transition-colors"
						>
							<span class="text-dracula-comment">{{ playlist.icon }}</span>
							<span
								class="text-dracula-green group-hover:text-dracula-purple transition-colors"
							>
								~/playlists/{{ playlist.name }}
							</span>
							<span class="text-dracula-comment text-sm">
								// {{ playlist.description }}
							</span>
						</a>
					</template>
				</div>
			</div>

			<!-- Terminal-style Pagination -->
			<div class="space-y-2 border-t border-dracula-current pt-2">
				<div class="text-dracula-comment">Navigation commands:</div>
				<div class="space-x-4">
					<button
						@click="prevPage"
						:disabled="currentPage === 1"
						class="text-dracula-green hover:text-dracula-purple disabled:text-dracula-comment transition-colors"
						:class="{ 'cursor-not-allowed': currentPage === 1 }"
					>
						[prev]
					</button>

					<button
						@click="nextPage"
						:disabled="currentPage === totalPages"
						class="text-dracula-green hover:text-dracula-purple disabled:text-dracula-comment transition-colors"
						:class="{ 'cursor-not-allowed': currentPage === totalPages }"
					>
						[next]
					</button>

					<span class="text-dracula-comment">or jump to page:</span>

					<span class="space-x-1">
						<template v-for="page in totalPages" :key="page">
							<button
								@click="goToPage(page)"
								class="transition-colors"
								:class="{
									'text-dracula-purple': currentPage === page,
									'text-dracula-green hover:text-dracula-purple':
										currentPage !== page,
								}"
							>
								[{{ page }}]
							</button>
						</template>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const currentTrack = ref(null);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const itemsPerPage = 3;

// Curated playlists
const playlists = [
	{
		name: 'Coding Focus',
		description: 'Deep focus music for programming sessions',
		url: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ',
		icon: '💻',
	},
	{
		name: 'Lo-Fi Beats',
		description: 'Chill beats to code/relax to',
		url: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
		icon: '🎧',
	},
	{
		name: 'Programming Soundtrack',
		description: 'Epic orchestral music for coding',
		url: 'https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j',
		icon: '🎮',
	},
	{
		name: 'Synthwave Coding',
		description: 'Retro synth vibes for cyberpunk coding',
		url: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
		icon: '🌆',
	},
	{
		name: 'Deep Tech House',
		description: 'Electronic beats for focused development',
		url: 'https://open.spotify.com/playlist/37i9dQZF1DX6J5NfMJS675',
		icon: '🎹',
	},
];

const totalPages = computed(() => Math.ceil(playlists.length / itemsPerPage));

const paginatedPlaylists = computed(() => {
	const start = (currentPage.value - 1) * itemsPerPage;
	const end = start + itemsPerPage;
	const playlistSlice = playlists.slice(start, end);

	// Pad with empty playlists to maintain consistent height
	while (playlistSlice.length < itemsPerPage) {
		playlistSlice.push({ empty: true });
	}

	return playlistSlice;
});

const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};

const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

const goToPage = (page) => {
	if (page >= 1 && page <= totalPages.value) {
		currentPage.value = page;
	}
};

const fetchCurrentTrack = async () => {
	try {
		loading.value = true;
		const response = await fetch('/api/spotify');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const { data, error: apiError } = await response.json();

		if (apiError && apiError !== 'No active playback') {
			throw new Error(apiError);
		}

		error.value = null;
		currentTrack.value = data
			? {
					...data,
					progress: msToTime(data.progress),
					duration: msToTime(data.duration),
			  }
			: null;
	} catch (e) {
		error.value = `Failed to fetch current track: ${e.message}`;
		console.error('Error fetching track:', e);
	} finally {
		loading.value = false;
	}
};

const msToTime = (ms) => {
	const minutes = Math.floor(ms / 60000);
	const seconds = ((ms % 60000) / 1000).toFixed(0);
	return `${minutes}:${seconds.padStart(2, '0')}`;
};

onMounted(fetchCurrentTrack);

// Refresh track info every 30 seconds
const interval = setInterval(fetchCurrentTrack, 30000);
onBeforeUnmount(() => clearInterval(interval));
</script>
