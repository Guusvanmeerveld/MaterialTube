import { createTheme as createMUITheme } from "@mui/material/styles";

import Settings from "@interfaces/settings";

const createTheme = (settings: Settings, prefersDarkMode: boolean) => {
	return createMUITheme({
		palette: {
			mode: prefersDarkMode ? "dark" : "light",
			primary: {
				main: settings.primaryColor
			},
			secondary: {
				main: settings.accentColor
			}
		}
	});
};

export default createTheme;
