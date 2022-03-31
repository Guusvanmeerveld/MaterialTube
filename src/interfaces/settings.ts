interface Settings {
	theme?: "light" | "dark";
	primaryColor: string;
	accentColor: string;
	invidiousServer: string;
	invidiousUsername?: string;
	storageType: StorageType;
	customServer?: string;
	password?: string;
}

export enum StorageType {
	Local = "local",
	Invidious = "invidious",
	RemoteServer = "remoteserver"
}

export default Settings;
