import { ref, onMounted } from 'vue';

const scrambleIp = (ip) => {
	const octets = ip.split('.');
	const scrambledOctets = octets.map((octet) => {
		const digits = octet.split('');
		// Fisher-Yates Shuffle
		for (let i = digits.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[digits[i], digits[j]] = [digits[j], digits[i]];
		}
		return digits.join('');
	});
	return scrambledOctets.join('.');
};

export const useVisitorIp = () => {
	const visitorIp = ref('');

	const fetchVisitorIp = async () => {
		try {
			const response = await fetch('https://api.ipify.org?format=json');
			if (!response.ok) throw new Error('Failed to fetch IP');
			const data = await response.json();
			visitorIp.value = scrambleIp(data.ip);
		} catch (error) {
			console.error('Error fetching visitor IP:', error);
			visitorIp.value = 'visitor';
		}
	};

	onMounted(fetchVisitorIp);

	return { visitorIp };
};
