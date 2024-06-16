import { useState } from "react";

import Client from "@/client";
import { ApiType } from "@/client/adapters";

export const useClient = (): Client => {
	const [client] = useState(
		() =>
			new Client([
				// { baseUrl: "https://invidious.fdn.fr/", type: ApiType.Invidious }
				{ baseUrl: "https://pipedapi.drgns.space/", type: ApiType.Piped }
			])
	);

	return client;
};
