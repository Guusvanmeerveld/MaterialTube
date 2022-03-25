import useLocalStorageState from "use-local-storage-state";

import { Dispatch, SetStateAction } from "react";

import { red } from "@mui/material/colors";

import Settings from "@interfaces/settings";

const defaultSettings: Settings = {
	primaryColor: red[800],
	accentColor: red[800],
	invidiousServer: process.env.NEXT_PUBLIC_DEFAULT_SERVER as string
};

export const useSettings = (): [
	settings: Settings,
	setSetting: Dispatch<SetStateAction<Settings>>
] => {
	const [settings, setSettings] = useLocalStorageState<Settings>("settings", {
		defaultValue: defaultSettings,
		ssr: false
	});

	return [settings, setSettings];
};
