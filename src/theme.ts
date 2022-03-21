import { red } from "@mui/material/colors";

import { createTheme as createMUITheme } from "@mui/material/styles";

const createTheme = (prefersDarkMode: boolean) => {
	return createMUITheme({
		palette: {
			mode: prefersDarkMode ? "dark" : "light",
			primary: {
				main: red[700]
			},
			secondary: {
				main: red[700]
			}
		}
	});
};

export default createTheme;
