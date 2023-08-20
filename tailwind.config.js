/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				"mauve-gradient": "linear-gradient(to right, #525252, #3d72b4)",
			},
			fontFamily: {
        caveat: ["'Caveat', cursive"],
      },
			colors: {
				primary: {
					main: "#3b82f6",
					light: "#60a5fa",
					dark: "#2563eb",
					contrastText: "#eff6ff"
				},
			}
		},
	},
	plugins: [],
}
