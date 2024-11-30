import { markRaw } from 'vue';
import HelpCommand from '~/components/commands/HelpCommand.vue';
import AboutCommand from '~/components/commands/AboutCommand.vue';
import ContactCommand from '~/components/commands/ContactCommand.vue';
import BenchmarkCommand from '~/components/commands/fun/BenchmarkCommand.vue';
import CryptoCommand from '~/components/commands/fun/CryptoCommand.vue';
import DiscordCommand from '~/components/commands/fun/DiscordCommand.vue';
/* import SkillsCommand from '~/components/commands/SkillsCommand.vue';
import ProjectsCommand from '~/components/commands/ProjectsCommand.vue';
import ContactCommand from '~/components/commands/ContactCommand.vue'; */
import PackageInstallCommand from '~/components/commands/fun/PackageInstallCommand.vue';
import CheatsheetCommand from '~/components/commands/CheatsheetCommand.vue';

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
		benchmark: {
			component: markRaw(BenchmarkCommand),
			aliases: ['bench', 'test'],
			hidden: true,
			description: 'Run a performance benchmark',
		},
		contact: {
			component: markRaw(ContactCommand),
			aliases: ['email', 'social'],
			hidden: false,
			description: 'Get my contact information and social links',
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
		discord: {
			component: markRaw(DiscordCommand),
			aliases: ['dm'],
			hidden: true,
			description: 'Send a message to my Discord server',
		},

		/* skills: {
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
		}, */
		clear: {
			action: () => 'CLEAR',
			aliases: ['cls', 'c'],
			hidden: false,
			description: 'Clear the terminal screen',
		},
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
		cheatsheet: {
			component: markRaw(CheatsheetCommand),
			aliases: ['all', 'commands'],
			hidden: true,
			description: 'Display all available commands, including hidden ones',
		},
		npm: {
			action: (args) => {
				if ((args[0] === 'i' || args[0] === 'install') && args[1]) {
					return {
						component: markRaw(PackageInstallCommand),
						props: { packageName: args[1] },
					};
				}
				return 'Usage: npm i <package-name>[@version] or npm install <package-name>[@version]';
			},
			aliases: [],
			hidden: true,
			description: 'Simulate npm package installation',
		},
		pnpm: {
			action: (args) => {
				if ((args[0] === 'i' || args[0] === 'install') && args[1]) {
					return {
						component: markRaw(PackageInstallCommand),
						props: { packageName: args[1] },
					};
				}
				return 'Usage: pnpm i <package-name>[@version] or pnpm install <package-name>[@version]';
			},
			aliases: [],
			hidden: true,
			description: 'Simulate pnpm package installation',
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

		return `Command not found: ${command}. Type 'help' for available commands.`;
	};

	return {
		commands: commandMap,
		commandConfig,
		getAllCommands,
		executeCommand,
	};
};
