import axios from "axios";

import { NextPage } from "next";

import { FC, useState } from "react";

import { useQuery } from "react-query";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
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

import Done from "@mui/icons-material/Done";
import Error from "@mui/icons-material/Error";

import { toCamelCase } from "@src/utils";

import {
	ServerInstance,
	ServerInstanceType,
	Stats
} from "@interfaces/api/instances";

import { useSettings } from "@utils/hooks";

import Layout from "@components/Layout";

const Settings: NextPage = () => {
	const [settings, setSettings] = useSettings();

	const setSetting = (key: string, value?: string): void => {
		setSettings({ ...settings, [key]: value });
	};

	const [modalIsOpen, setModalState] = useState(false);

	const theme = useTheme();

	const instances = useQuery<[string, ServerInstance][]>(
		"invidiousInstances",
		() =>
			axios
				.get("https://api.invidious.io/instances.json")
				.then((res) => res.data),
		{ retry: false }
	);

	const invidiousServerResponse = useQuery<Stats>("invidiousInstance", () =>
		axios
			.get(`https://${settings.invidiousServer}/api/v1/stats`)
			.then((res) => res.data)
	);

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

	const InfoModal: FC = () => {
		const data = invidiousServerResponse.data!;

		const lastUpdated = new Date(data.metadata.updatedAt * 1000);

		return (
			<Modal
				open={modalIsOpen}
				onClose={() => setModalState(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						p: 4,
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
						backgroundColor: theme.palette.background.paper,
						borderRadius: 1,
						outline: "none"
					}}
				>
					<Typography id="modal-modal-title" variant="h4">
						Stats for {settings.invidiousServer}
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Version: {data.version} <br /> <br />
						Software name: {data.software.name} <br />
						Software version: {data.software.version} <br />
						Software branch: {data.software.branch} <br /> <br />
						Is accepting registrations: {data.openRegistrations
							? "Yes"
							: "No"}{" "}
						<br /> <br />
						Total users: {data.usage.users.total} <br />
						Active in the past half year: {data.usage.users.activeHalfyear}
						<br />
						Active in the past month: {data.usage.users.activeMonth} <br />{" "}
						<br />
						Stats updated at: {lastUpdated.toLocaleDateString()} -{" "}
						{lastUpdated.toLocaleTimeString()}
					</Typography>
				</Box>
			</Modal>
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

				<Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
					<Typography variant="h5" sx={{ flexGrow: 1 }}>
						Invidious Server
					</Typography>
					<Box sx={{ mr: 2 }}>
						{invidiousServerResponse.data &&
							!invidiousServerResponse.isLoading && (
								<>
									<Done
										onClick={() => setModalState(true)}
										sx={{ color: green[800], cursor: "pointer" }}
									/>
									<InfoModal />
								</>
							)}
						{invidiousServerResponse.error && (
							<Error sx={{ color: red[800] }} />
						)}
						{invidiousServerResponse.isLoading && <CircularProgress />}
					</Box>
					<FormControl sx={{ minWidth: 200 }}>
						<InputLabel id="server-select-label">Server</InputLabel>
						<Select
							labelId="server-select-label"
							id="server-select"
							value={settings.invidiousServer}
							label="Server"
							onChange={(e) => {
								const server = e.target.value;

								setSetting("invidiousServer", server);
							}}
							MenuProps={{ sx: { maxHeight: 300 } }}
						>
							{instances.data &&
								instances.data
									.filter(
										([, server]) =>
											server.type != ServerInstanceType.Onion &&
											server.api == true
									)
									.map(([uri, server]) => (
										<MenuItem key={uri} value={uri}>
											{server.flag} {uri}
										</MenuItem>
									))}
						</Select>
					</FormControl>
				</Box>
			</Container>
		</Layout>
	);
};

export default Settings;
