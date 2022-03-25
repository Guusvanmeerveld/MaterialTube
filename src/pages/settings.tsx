import { NextPage } from "next";

import { FC } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {
	blue,
	red,
	green,
	cyan,
	purple,
	yellow,
	orange
} from "@mui/material/colors/";
import { useTheme } from "@mui/material/styles/";

import { toCamelCase } from "@src/utils";

import { useSettings } from "@utils/hooks";

import Layout from "@components/Layout";

const Settings: NextPage = () => {
	const [settings, setSettings] = useSettings();

	const theme = useTheme();

	const setSetting = (key: string, value?: string): void => {
		setSettings({ ...settings, [key]: value });
	};

	const ColorSetting: FC<{ type: string }> = ({ type }) => {
		const camelCase = toCamelCase(type) as "primaryColor" | "accentColor";

		return (
			<Box sx={{ my: 3, display: "flex" }}>
				<Typography variant="h5" sx={{ flexGrow: 1 }}>
					{type}
				</Typography>
				{[
					blue[800],
					red[800],
					green[800],
					cyan[800],
					purple[800],
					yellow[800],
					orange[800]
				].map((color) => (
					<Box
						onClick={() => setSetting(camelCase, color)}
						key={color}
						component="span"
						sx={{
							width: 24,
							height: 24,
							backgroundColor: color,
							borderRadius: "50%",
							border:
								color == settings[camelCase]
									? {
											borderColor: theme.palette.text.primary,
											borderWidth: 1,
											borderStyle: "solid"
									  }
									: null,
							cursor: "pointer",
							ml: 1.5
						}}
					/>
				))}
			</Box>
		);
	};

	return (
		<Layout>
			<Container>
				<Typography sx={{ my: 2 }} variant="h2">
					Settings
				</Typography>

				<Divider sx={{ mb: 4 }} />

				<Typography variant="h4">Theme</Typography>

				<Box sx={{ my: 3, display: "flex" }}>
					<Typography variant="h5" sx={{ flexGrow: 1 }}>
						General theme
					</Typography>
					<ButtonGroup
						variant="contained"
						color="primary"
						aria-label="outlined default button group"
					>
						<Button onClick={() => setSetting("theme", "light")}>Light</Button>
						<Button onClick={() => setSetting("theme")}>System</Button>
						<Button onClick={() => setSetting("theme", "dark")}>Dark</Button>
					</ButtonGroup>
				</Box>

				<ColorSetting type="Primary Color" />

				<ColorSetting type="Accent Color" />

				<Divider sx={{ my: 4 }} />

				<Typography variant="h4">Player</Typography>

				<Divider sx={{ my: 4 }} />

				<Typography variant="h4">Miscellaneous</Typography>
			</Container>
		</Layout>
	);
};

export default Settings;
