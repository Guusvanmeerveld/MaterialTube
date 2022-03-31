import { NextPage } from "next";
import { NextSeo } from "next-seo";

import { FC, useState } from "react";

import { useMutation, useQuery } from "react-query";

import axios from "axios";

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
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { red, green } from "@mui/material/colors/";
import { useTheme } from "@mui/material/styles/";

import Done from "@mui/icons-material/Done";
import Error from "@mui/icons-material/Error";
import Refresh from "@mui/icons-material/Refresh";

import {
	ServerInstance,
	ServerInstanceType,
	Stats
} from "@interfaces/api/instances";
import { StorageType } from "@interfaces/settings";

import { useSettings } from "@utils/hooks";

import Layout from "@components/Layout";
import MaterialColorPicker from "@components/MaterialColorPicker";
import ColorBox from "@components/MaterialColorPicker/ColorBox";
import ModalBox from "@components/ModalBox";

const InfoModal: FC<{
	modalIsOpen: boolean;
	setModalState: (isOpen: boolean) => void;
	data: Stats;
}> = ({ modalIsOpen, setModalState, data }) => {
	const [settings] = useSettings();

	const lastUpdated = new Date(data.metadata.updatedAt * 1000);

	return (
		<Modal
			open={modalIsOpen}
			onClose={() => setModalState(false)}
			aria-labelledby="stats-modal"
			aria-describedby="Shows server stats"
		>
			<ModalBox>
				<Typography id="modal-modal-title" variant="h4">
					Stats for {settings.invidiousServer}
				</Typography>
				<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					Version: {data.version} <br /> <br />
					Software name: {data.software.name} <br />
					Software version: {data.software.version} <br />
					Software branch: {data.software.branch} <br /> <br />
					Is accepting registrations: {data.openRegistrations ? "Yes" : "No"}
					<br /> <br />
					Total users: {data.usage.users.total} <br />
					Active in the past half year: {data.usage.users.activeHalfyear}
					<br />
					Active in the past month: {data.usage.users.activeMonth} <br /> <br />
					Stats updated at: {lastUpdated.toLocaleDateString()} -{" "}
					{lastUpdated.toLocaleTimeString()}
				</Typography>
			</ModalBox>
		</Modal>
	);
};

const Setting: FC<{ title: string; description?: string }> = ({
	title,
	children,
	description
}) => {
	const theme = useTheme();

	return (
		<Box sx={{ my: 3, display: "flex", alignItems: "center" }}>
			<Box sx={{ flexGrow: 1 }}>
				<Typography variant="h5">{title}</Typography>
				{description && (
					<Typography variant="subtitle1" color={theme.palette.text.secondary}>
						{description}
					</Typography>
				)}
			</Box>
			{children}
		</Box>
	);
};

const Settings: NextPage = () => {
	const [settings, setSettings] = useSettings();

	const setSetting = (key: string, value?: string): void =>
		setSettings({ ...settings, [key]: value });

	const theme = useTheme();

	const [primaryColorModalIsOpen, setPrimaryColorModal] = useState(false);
	const [accentColorModalIsOpen, setAccentColorModal] = useState(false);

	const [modalIsOpen, setModalState] = useState(false);

	const instances = useQuery<[string, ServerInstance][]>(
		"invidiousInstances",
		() =>
			axios
				.get("https://api.invidious.io/instances.json")
				.then((res) => res.data),
		{ retry: false }
	);

	const invidiousServerResponse = useMutation<Stats, unknown, string>(
		"invidiousInstance",
		(server) =>
			axios.get(`https://${server}/api/v1/stats`).then((res) => res.data)
	);

	const allowsRegistrations = invidiousServerResponse.data?.openRegistrations;

	return (
		<>
			<NextSeo
				title="Settings"
				description={`Update your ${process.env.NEXT_PUBLIC_APP_NAME} settings`}
			/>
			<Layout>
				<Container>
					<Typography sx={{ my: 2 }} variant="h2">
						Settings
					</Typography>

					<Divider sx={{ mb: 4 }} />

					<Typography variant="h4">Theme</Typography>

					<Setting
						title="General Theme"
						description="Sets the background color"
					>
						<ButtonGroup
							variant="contained"
							color="primary"
							aria-label="outlined default button group"
						>
							<Button onClick={() => setSetting("theme", "light")}>
								Light
							</Button>
							<Button onClick={() => setSetting("theme")}>System</Button>
							<Button onClick={() => setSetting("theme", "dark")}>Dark</Button>
						</ButtonGroup>
					</Setting>

					<Setting title="Primary Color">
						<ColorBox marginRight={1} color={settings.primaryColor} />
						<Button
							onClick={() => setPrimaryColorModal(true)}
							variant="contained"
						>
							Pick Color
						</Button>
						<MaterialColorPicker
							setState={setPrimaryColorModal}
							isOpen={primaryColorModalIsOpen}
							setColor={(color) => setSetting("primaryColor", color)}
							selectedColor={settings.primaryColor}
						/>
					</Setting>

					<Setting title="Accent Color">
						<ColorBox marginRight={1} color={settings.accentColor} />
						<Button
							onClick={() => setAccentColorModal(true)}
							variant="contained"
						>
							Pick Color
						</Button>
						<MaterialColorPicker
							setState={setAccentColorModal}
							isOpen={accentColorModalIsOpen}
							setColor={(color) => setSetting("accentColor", color)}
							selectedColor={settings.accentColor}
						/>
					</Setting>

					<Divider sx={{ my: 4 }} />

					<Typography variant="h4">Player</Typography>

					<Divider sx={{ my: 4 }} />

					<Typography variant="h4">Data</Typography>

					<Setting
						title="Invidious Server"
						description={`Where to fetch data from ${
							settings.storageType == "invidious" ? "and login into" : ""
						}`}
					>
						<Box sx={{ mr: 2 }}>
							{!invidiousServerResponse.data &&
								!invidiousServerResponse.error &&
								!invidiousServerResponse.isLoading && (
									<Refresh
										sx={{
											cursor: "pointer",
											color: theme.palette.text.secondary
										}}
										onClick={() =>
											invidiousServerResponse.mutate(settings.invidiousServer)
										}
									/>
								)}
							{invidiousServerResponse.data &&
								!invidiousServerResponse.isLoading && (
									<>
										<Done
											onClick={() => setModalState(true)}
											sx={{ color: green[800], cursor: "pointer" }}
										/>
										<InfoModal
											modalIsOpen={modalIsOpen}
											setModalState={setModalState}
											data={invidiousServerResponse.data!}
										/>
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

									invidiousServerResponse.mutate(server);

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
					</Setting>

					<Setting
						title="Data Storage Location"
						description="Where your personal data will be stored"
					>
						<FormControl sx={{ minWidth: 200 }}>
							<InputLabel id="location-select-label">Location</InputLabel>
							<Select
								labelId="location-select-label"
								id="location-select"
								value={settings.storageType}
								label="Location"
								onChange={(e) => {
									const location = e.target.value;

									setSetting("storageType", location);
								}}
								MenuProps={{ sx: { maxHeight: 300 } }}
							>
								{[
									{ name: "Locally", value: StorageType.Local },
									{
										name: "Invidious server using auth",
										value: StorageType.Invidious
									},
									{
										name: `A custom ${process.env.NEXT_PUBLIC_APP_NAME} auth server`,
										value: StorageType.RemoteServer
									}
								].map((location, i) => (
									<MenuItem key={i} value={location.value}>
										{location.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Setting>

					{settings.storageType != StorageType.Local && (
						<>
							{settings.storageType == "invidious" && allowsRegistrations && (
								<Setting
									title="Username"
									description="The username for your Invidious account"
								>
									<TextField label="Username" color="primary" />
								</Setting>
							)}

							{settings.storageType == StorageType.RemoteServer && (
								<Setting
									title="Server address"
									description={`The address for your ${process.env.NEXT_PUBLIC_APP_NAME} auth server`}
								>
									<TextField label="Server adress" color="primary" />
								</Setting>
							)}

							<Setting
								title={
									settings.storageType == StorageType.Invidious
										? "Password"
										: "Passphrase"
								}
								description={
									settings.storageType == StorageType.Invidious
										? "The password for your invidious account"
										: "The passphrase for your account"
								}
							>
								<TextField
									type="password"
									label={
										settings.storageType == StorageType.Invidious
											? "Password"
											: "Passphrase"
									}
									color="primary"
								/>
							</Setting>
						</>
					)}
				</Container>
			</Layout>
		</>
	);
};

export default Settings;
