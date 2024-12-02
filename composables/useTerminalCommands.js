import { markRaw } from 'vue';
// BASE COMMANDS
import HelpCommand from '~/components/commands/HelpCommand.vue';
import AboutCommand from '~/components/commands/AboutCommand.vue';
/* import SkillsCommand from '~/components/commands/SkillsCommand.vue'; */
import ProjectsCommand from '~/components/commands/ProjectsCommand.vue';
import ContactCommand from '~/components/commands/ContactCommand.vue';
import DonateCommand from '~/components/commands/DonateCommand.vue';
import FaqCommand from '~/components/commands/FaqCommand.vue';
import MusicCommand from '~/components/commands/MusicCommand.vue';
import ReposCommand from '~/components/commands/ReposCommand.vue';
// FUN COMMANDS
import BenchmarkCommand from '~/components/commands/fun/BenchmarkCommand.vue';
import CryptoCommand from '~/components/commands/fun/CryptoCommand.vue';
import HackCommand from '~/components/commands/fun/HackCommand.vue';
import PackageInstallCommand from '~/components/commands/fun/PackageInstallCommand.vue';
import CheatsheetCommand from '~/components/commands/CheatsheetCommand.vue';
import EchoCommand from '~/components/commands/fun/EchoCommand.vue';
import MatrixCommand from '~/components/commands/fun/MatrixCommand.vue';

export const useTerminalCommands = () => {
	const commandConfig = {
		help: {
			component: markRaw(HelpCommand),
			aliases: ['h', '?'],
			hidden: false,
			description: 'Display available commands and their aliases',
		},
		about: {
			component: markRaw(AboutCommand),
			aliases: ['whoami', 'info'],
			hidden: false,
			description: 'Learn more about me and my background',
		},

		contact: {
			component: markRaw(ContactCommand),
			aliases: ['email', 'social'],
			hidden: false,
			description: 'Get my contact information and social links',
		},

		donate: {
			component: markRaw(DonateCommand),
			aliases: ['support'],
			hidden: false,
			description: 'Support my work and projects',
		},
		faq: {
			component: markRaw(FaqCommand),
			aliases: [],
			hidden: false,
			description: 'View frequently asked questions and answers',
		},
		music: {
			component: markRaw(MusicCommand),
			aliases: ['playlist', 'spotify'],
			hidden: false,
			description: 'View my curated Spotify playlists',
		},
		/* skills: {
			component: markRaw(SkillsCommand),
			aliases: ['stack', 'tech'],
			hidden: false,
			description: 'View my technical skills and expertise',
		},*/
		projects: {
			component: markRaw(ProjectsCommand),
			aliases: ['work', 'portfolio'],
			hidden: false,
			description: 'Browse my featured projects and work',
		},
		repos: {
			component: markRaw(ReposCommand),
			aliases: ['github'],
			hidden: false,
			description: 'Browse my GitHub repositories',
		},
		clear: {
			action: () => 'CLEAR',
			aliases: ['cls', 'c'],
			hidden: false,
			description: 'Clear the terminal screen',
		},
		cheatsheet: {
			component: markRaw(CheatsheetCommand),
			aliases: ['all', 'commands'],
			hidden: true,
			description: 'Display all available commands, including hidden ones',
		},
		/* FUN COMMANDS START HERE */
		/* whoami: {
			action: () => `<p class="text-dracula-green">guest</p>`,
			aliases: ['user', 'who'],
			hidden: true,
			description: 'Display current user',
		},
		date: {
			action: () => `<p>${new Date().toLocaleString()}</p>`,
			aliases: ['time', 'd'],
			hidden: true,
			description: 'Show current date and time',
		}, */
		benchmark: {
			component: markRaw(BenchmarkCommand),
			aliases: ['bench', 'test'],
			hidden: true,
			description: 'Run a performance benchmark',
		},
		echo: {
			action: (args) => {
				const fullText = args.join(' ');
				const quoteMatch = fullText.match(/^"(.+)"$/);

				if (!quoteMatch) {
					return {
						component: markRaw(EchoCommand),
						props: { error: true },
					};
				}

				return {
					component: markRaw(EchoCommand),
					props: { message: quoteMatch[1] },
				};
			},
			aliases: [],
			hidden: true,
			description: 'Echo a message back to the terminal',
		},
		encrypt: {
			component: markRaw(CryptoCommand),
			props: { mode: 'encrypt' }, // Pass the mode prop
			aliases: ['enc'],
			hidden: true,
			description: 'Encrypt your portfolio data',
		},
		decrypt: {
			component: markRaw(CryptoCommand),
			props: { mode: 'decrypt' }, // Pass the mode prop
			aliases: ['dec'],
			hidden: true,
			description: 'Decrypt your portfolio data',
		},
		hack: {
			component: markRaw(HackCommand),
			aliases: [],
			hidden: true,
			description: 'Hacking the mainframe',
		},
		matrix: {
			component: markRaw(MatrixCommand),
			aliases: [],
			hidden: true,
			description: 'Enter into the Matrix',
		},
		npm: {
			action: (args) => {
				if ((args[0] === 'i' || args[0] === 'install') && args[1]) {
					return {
						component: markRaw(PackageInstallCommand),
						props: { packageName: args[1] },
					};
				}
				return 'Usage: npm i [package-name] or npm install [package-name]';
			},
			aliases: [],
			hidden: true,
			description: 'npm package installation',
		},
		pnpm: {
			action: (args) => {
				if ((args[0] === 'i' || args[0] === 'install') && args[1]) {
					return {
						component: markRaw(PackageInstallCommand),
						props: { packageName: args[1] },
					};
				}
				return 'Usage: pnpm i [package-name] or pnpm install [package-name]';
			},
			aliases: ['pn'],
			hidden: true,
			description: 'pnpm package installation',
		},
	};

	// Create a map of all commands including aliases
	/* 	const commandMap = Object.entries(commandConfig).reduce(
		(acc, [cmd, config]) => {
			// Add main command
			acc[cmd] = config.component
				? () => ({
						component: config.component,
						props: config.props,
				  })
				: config.action;

			// Add aliases
			config.aliases?.forEach((alias) => {
				acc[alias] = acc[cmd];
			});

			return acc;
		},
		{}
	); */

	const commandMap = {};

	for (const [cmd, config] of Object.entries(commandConfig)) {
		const commandHandler = config.component
			? () => ({
					component: config.component,
					props: config.props,
			  })
			: config.action;

		commandMap[cmd] = commandHandler;

		// Add aliases
		config.aliases?.forEach((alias) => {
			commandMap[alias] = commandHandler;
		});
	}

	const getAllCommands = () => {
		return Object.entries(commandConfig)
			.filter(([_, config]) => !config.hidden) // Only return non-hidden commands
			.map(([cmd, config]) => ({
				command: cmd,
				aliases: config.aliases || [],
				description: config.description,
			}));
	};

	const executeCommand = async (input) => {
		const [command, ...args] = input.trim().toLowerCase().split(' ');

		if (commandMap[command]) {
			return commandMap[command](args);
		}

		return `<span class="text-dracula-red">Command not found. Type '<span class="font-bold">help</span>' for available commands.</span>`;
	};

	return {
		commands: commandMap,
		commandConfig,
		getAllCommands,
		executeCommand,
	};
};
