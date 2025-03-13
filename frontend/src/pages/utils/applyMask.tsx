// Mascaras (react-input-mask não tava funcionando)
const applyMask = (value: string, mask: string) => {
	let i = 0;
	return mask.replace(/#/g, () => value[i++] || "");
};

export default applyMask;
