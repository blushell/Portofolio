<template>
	<div class="space-y-4">
		<!-- Loading State -->
		<div v-if="loading" class="text-dracula-purple animate-pulse">
			Fetching repositories...
		</div>

		<!-- Error State -->
		<div v-else-if="error" class="text-dracula-red">
			{{ error }}
		</div>

		<!-- Repos List -->
		<template v-else>
			<!-- Header -->
			<div
				class="text-dracula-purple font-bold border-b border-dracula-current pb-2"
			>
				Public Repositories (Page {{ currentPage }}/{{ totalPages }})
			</div>

			<!-- Repository List -->
			<div class="space-y-3 min-h-[400px]">
				<div
					v-for="repo in paginatedRepos"
					:key="repo.name"
					class="h-[40px] flex items-start"
				>
					<template v-if="!repo.empty">
						<div class="space-y-1">
							<div class="flex items-center gap-2">
								<a
									:href="repo.url"
									target="_blank"
									class="text-dracula-green hover:text-dracula-cyan transition-colors"
								>
									$ {{ repo.name }}
								</a>
								<span v-if="repo.language" class="text-dracula-pink text-sm">
									[{{ repo.language }}]
								</span>
								<span v-if="repo.stars > 0" class="text-dracula-yellow text-sm">
									★ {{ repo.stars }}
								</span>
							</div>

							<div
								v-if="repo.description"
								class="text-dracula-comment text-sm ml-4"
							>
								{{ repo.description }}
							</div>
						</div>
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
		</template>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Octokit } from 'octokit';

const USERNAME = 'blushell';
const ITEMS_PER_PAGE = 10;

const repos = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);

const totalPages = computed(() =>
	Math.ceil(repos.value.length / ITEMS_PER_PAGE)
);

const paginatedRepos = computed(() => {
	const start = (currentPage.value - 1) * ITEMS_PER_PAGE;
	const end = start + ITEMS_PER_PAGE;
	const repoSlice = repos.value.slice(start, end);

	// Pad with empty repos to maintain consistent height
	while (repoSlice.length < ITEMS_PER_PAGE) {
		repoSlice.push({ empty: true });
	}

	return repoSlice;
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

const fetchRepos = async () => {
	try {
		const octokit = new Octokit();
		const response = await octokit.request('GET /users/{username}/repos', {
			username: USERNAME,
			sort: 'updated',
			per_page: 100,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
			},
		});

		repos.value = response.data
			.filter((repo) => !repo.fork && repo.name !== USERNAME)
			.map((repo) => ({
				name: repo.name,
				description: repo.description,
				language: repo.language,
				stars: repo.stargazers_count,
				url: repo.html_url,
				updated: new Date(repo.updated_at).toLocaleDateString(),
			}));
	} catch (e) {
		error.value = 'Failed to fetch repositories. Please try again later.';
		console.error('Error fetching repos:', e);
	} finally {
		loading.value = false;
	}
};

onMounted(fetchRepos);
</script>
