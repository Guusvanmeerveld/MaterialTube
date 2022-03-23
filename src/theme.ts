import { red } from "@mui/material/colors";
import { createTheme as createMUITheme } from "@mui/material/styles";

const createTheme = (prefersDarkMode: boolean) => {
	return createMUITheme({
		palette: {
			mode: prefersDarkMode ? "dark" : "light",
			primary: {
				main: red[800]
			},
			secondary: {
				main: red[800]
			}
		}
	});
};

export default createTheme;
