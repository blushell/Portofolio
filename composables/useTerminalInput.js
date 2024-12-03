const isVisible = ref(true);

export const useTerminalInput = () => {
	const hideInput = () => (isVisible.value = false);
	const showInput = () => (isVisible.value = true);

	return {
		isVisible,
		hideInput,
		showInput,
	};
};
