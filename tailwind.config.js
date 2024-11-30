/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	theme: {
		extend: {
			colors: {
				terminal: {
					bg: '#44475A',
					icon: '#FF79C6',
					max: '#48CA38',
					min: '#F4C025',
					close: '#F36259',
				},
				dracula: {
					bg: '#282A36',
					text: '#F8F8F2',
					current: '#44475A',
					comment: '#6272A4',
					purple: '#BD93F9',
					pink: '#FF79C6',
					cyan: '#8BE9FD',
					green: '#50FA7B',
					orange: '#FFB86C',
					red: '#ff5555',
					yellow: '#F1FA8C',
				},
				ansi: {
					COLOR1: '#FF6E6E',
					COLOR2: '#69FF94',
					COLOR3: '#FFFFA5',
					COLOR4: '#D6ACFF',
					COLOR5: '#FF92DF',
					COLOR6: '#A4FFFF',
				},
				brightOther: {
					TEMP_QUOTES: '#E9F284',
					TEMP_PROPERTY_QUOTES: '#8BE9FE',
				},
				other: {
					LineHighlight: '#44475A75',
					NonText: '#FFFFFF1A',
					WHITE: '#FFFFFF',
					TAB_DROP_BG: '#44475A70',
					BGLighter: '#424450',
					BGLight: '#343746',
					BGDark: '#21222C',
					BGDarker: '#191A21',
				},
			},
			fontFamily: {
				mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
			},
		},
	},
	plugins: [],
};
