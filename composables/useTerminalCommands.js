import { markRaw } from 'vue';
// BASE COMMANDS
import HelpCommand from '~/components/commands/HelpCommand.vue';
import AboutCommand from '~/components/commands/AboutCommand.vue';
import CheatsheetCommand from '~/components/commands/CheatsheetCommand.vue';
import ContactCommand from '~/components/commands/ContactCommand.vue';
import DonateCommand from '~/components/commands/DonateCommand.vue';
import FaqCommand from '~/components/commands/FaqCommand.vue';
import MusicCommand from '~/components/commands/MusicCommand.vue';
import ProjectsCommand from '~/components/commands/ProjectsCommand.vue';
import ReposCommand from '~/components/commands/ReposCommand.vue';
import SettingsCommand from '~/components/commands/SettingsCommand.vue';
import SkillsCommand from '~/components/commands/SkillsCommand.vue';
import StartupsCommand from '~/components/commands/StartupsCommand.vue';
import StoreCommand from '~/components/commands/StoreCommand.vue';
import ToolsCommand from '~/components/commands/ToolsCommand.vue';
import WinSetupCommand from '~/components/commands/WinSetupCommand.vue';

// FUN COMMANDS
import BenchmarkCommand from '~/components/commands/fun/BenchmarkCommand.vue';
import CryptoCommand from '~/components/commands/fun/CryptoCommand.vue';
import EchoCommand from '~/components/commands/fun/EchoCommand.vue';
import HackCommand from '~/components/commands/fun/HackCommand.vue';
import MatrixCommand from '~/components/commands/fun/MatrixCommand.vue';
import PackageInstallCommand from '~/components/commands/fun/PackageInstallCommand.vue';
import SelfDestructCommand from '~/components/commands/fun/SelfDestructCommand.vue';
import SshCommand from '~/components/commands/fun/SshCommand.vue';

export const useTerminalCommands = () => {
	const commandConfig = {
		help: {
			component: markRaw(HelpCommand),
			aliases: ['h', '?'],
			hidden: true,
			description: 'Display available commands and their aliases',
		},
		about: {
			component: markRaw(AboutCommand),
			aliases: ['whoami', 'info'],
			hidden: false,
			description: 'Learn more about me and my background',
		},
		faq: {
			component: markRaw(FaqCommand),
			aliases: [],
			hidden: false,
			description: 'View frequently asked questions and answers',
		},
		skills: {
			component: markRaw(SkillsCommand),
			aliases: ['stack', 'tech'],
			hidden: false,
			description: 'View my technical skills and expertise',
		},
		projects: {
			component: markRaw(ProjectsCommand),
			aliases: ['work', 'portfolio'],
			hidden: false,
			description: 'Browse my featured projects and work',
		},
		repos: {
			component: markRaw(ReposCommand),
			aliases: ['github'],
			hidden: true,
			description: 'Browse my GitHub repositories',
		},
		startups: {
			component: markRaw(StartupsCommand),
			aliases: ['business'],
			hidden: false,
			description: 'Learn about my startup journey and projects',
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
		store: {
			component: markRaw(StoreCommand),
			aliases: ['shop'],
			hidden: false,
			description: 'Visit my store and purchase products',
		},
		cheatsheet: {
			component: markRaw(CheatsheetCommand),
			aliases: ['all', 'commands'],
			hidden: false,
			description: 'Display all available commands, including hidden ones',
		},
		clear: {
			action: () => 'CLEAR',
			aliases: ['cls', 'c'],
			hidden: false,
			description: 'Clear the terminal screen',
		},
		music: {
			component: markRaw(MusicCommand),
			aliases: ['playlist', 'spotify'],
			hidden: true,
			description: 'View my curated Spotify playlists',
		},
		settings: {
			component: markRaw(SettingsCommand),
			aliases: ['config'],
			hidden: true,
			description: 'Manage terminal settings',
		},
		tools: {
			component: markRaw(ToolsCommand),
			aliases: ['apps'],
			hidden: true,
			description: 'Browse my tools and applications',
		},
		winsetup: {
			component: markRaw(WinSetupCommand),
			aliases: ['win', 'windows'],
			hidden: true,
			description: 'Install Windows tools and applications',
		},

		/* FUN COMMANDS START HERE */
		benchmark: {
			component: markRaw(BenchmarkCommand),
			aliases: ['bench', 'test'],
			hidden: true,
			description: 'Run a performance benchmark',
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
		selfdestruct: {
			component: markRaw(SelfDestructCommand),
			aliases: ['sd', 'boom'],
			hidden: true,
			description: 'Self destruct the terminal',
		},
		ssh: {
			action: (args) => {
				const command = `ssh ${args.join(' ')}`;
				console.log('Executing SSH command:', command); // Debug log
				return {
					component: markRaw(SshCommand),
					props: { command },
				};
			},
			aliases: [],
			hidden: true,
			description: 'Connect to a remote server via SSH',
		},
	};

	// Create a map of all commands including aliases
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
