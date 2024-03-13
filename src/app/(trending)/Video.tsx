"use client";

import Client from "@/client";
import { ApiType } from "@/client/adapters";
import { Component } from "@/typings/component";
import { useEffect } from "react";

export const Video: Component = ({}) => {
	useEffect(() => {
		const client = new Client([
			{ baseUrl: "https://invidious.drgns.space", type: ApiType.Invidious },
			{ baseUrl: "https://pipedapi.kavin.rocks", type: ApiType.Piped }
		]);

		client.getTrending("US").then(console.log);
	}, []);

	return <></>;
};
