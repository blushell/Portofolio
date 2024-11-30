// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	ssr: true,
	modules: ['@nuxtjs/tailwindcss'],
	css: [
		'~/assets/css/tailwind.css',
		'@mdi/font/css/materialdesignicons.min.css',
	],
	app: {
		head: {
			title: 'Terminal Portfolio',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
				{ name: 'description', content: 'JonesyDev Portfolio' },
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
				},
			],
		},
	},
});
