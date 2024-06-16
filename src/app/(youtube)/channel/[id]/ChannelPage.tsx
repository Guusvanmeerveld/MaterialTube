"use client";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import { useClient } from "@/hooks/useClient";

import { Container } from "@/components/Container";

export const ChannelPage: FC<{ channelId: string }> = ({ channelId }) => {
	const client = useClient();

	const { error } = useQuery({
		queryKey: ["channel", channelId],
		queryFn: () => {
			return client.getChannel(channelId);
		}
	});

	console.log(error);

	return <Container>{channelId}</Container>;
};
