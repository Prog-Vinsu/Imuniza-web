import flowbite from "flowbite-react/tailwind";

module.exports = {
	content: ["./src/**/*.{tsx, ts}", flowbite.content()],
	theme: {
		extend: {},
	},
	plugins: [flowbite.plugin()],
};
