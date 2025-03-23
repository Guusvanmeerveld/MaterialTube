"use client";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

import { useClient } from "@/hooks/useClient";

import { Container } from "@/components/Container";

import { Header } from "./Header";

export const ChannelPage: FC<{ channelId: string }> = ({ channelId }) => {
	const client = useClient();

	const { data, error: fetchError } = useQuery({
		queryKey: ["channel", channelId],
		queryFn: () => client.getChannel(channelId)
	});

	const error: Error | null = fetchError;

	return (
		<Container>{data && error === null && <Header data={data} />}</Container>
	);
};
