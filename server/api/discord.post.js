import { Webhook } from 'discord-webhook-node';

// Move messageHistory outside the handler to persist between requests
const messageHistory = new Map();
const COOLDOWN_MS = 60000; // 60 seconds cooldown

export default defineEventHandler(async (event) => {
	const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

	try {
		if (!WEBHOOK_URL) {
			throw new Error('Discord webhook URL not configured');
		}

		const body = await readBody(event);
		const { name, message, ip } = body;

		// Check cooldown
		const lastMessageTime = messageHistory.get(ip);
		const now = Date.now();

		if (lastMessageTime && now - lastMessageTime < COOLDOWN_MS) {
			const remainingTime = Math.ceil(
				(COOLDOWN_MS - (now - lastMessageTime)) / 1000
			);
			throw new Error(
				`Please wait ${remainingTime} seconds before sending another message`
			);
		}

		// Update cooldown timestamp
		messageHistory.set(ip, now);

		// Clean up old entries
		for (const [key, time] of messageHistory.entries()) {
			if (now - time > COOLDOWN_MS) {
				messageHistory.delete(key);
			}
		}

		const hook = new Webhook(WEBHOOK_URL);

		// Set username if provided, otherwise use "Anonymous"
		if (name) {
			hook.setUsername(name);
		} else {
			hook.setUsername('Anonymous Visitor');
		}

		// Send message
		await hook.send(message);

		return { success: true };
	} catch (error) {
		throw createError({
			statusCode: 429,
			message: error.message || 'Failed to send message',
		});
	}
});
