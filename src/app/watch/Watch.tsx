"use client";

import { useClient } from "@/hooks/useClient";
import { Component } from "@/typings/component";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const Watch: Component = () => {
	const client = useClient();

	const searchParams = useSearchParams();

	const videoId = searchParams.get("v");

	const { data, error } = useQuery({
		queryKey: ["watch", videoId],
		queryFn: () => {
			return client.getStream(videoId ?? "");
		}
	});

	console.log(data, error);

	return <></>;
};
