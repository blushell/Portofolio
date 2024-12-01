export const useTypewriter = () => {
	const typeText = async (text, callback, speed = 200) => {
		let index = 0;
		return new Promise((resolve) => {
			const interval = setInterval(() => {
				callback(text.substring(0, index + 1));
				index++;

				if (index === text.length) {
					clearInterval(interval);
					resolve();
				}
			}, speed);
		});
	};

	return {
		typeText,
	};
};
