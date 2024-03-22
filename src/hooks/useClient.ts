import Client from "@/client";
import { ApiType } from "@/client/adapters";

import { useState } from "react";

export const useClient = () => {
	const [client] = useState(
		() =>
			new Client([
				// { baseUrl: "https://invidious.fdn.fr/", type: ApiType.Invidious }
				{ baseUrl: "https://pipedapi.kavin.rocks", type: ApiType.Piped }
			])
	);

	return client;
};
