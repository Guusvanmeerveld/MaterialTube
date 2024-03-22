"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { useClient } from "@/hooks/useClient";

import { Component } from "@/typings/component";

export const Watch: Component = () => {
	const client = useClient();

	const searchParams = useSearchParams();

	const videoId = searchParams.get("v") as string;

	const videoIdIsInvalid = useMemo(() => videoId === null, [videoId]);

	const { data, error } = useQuery({
		queryKey: ["watch", videoId],
		queryFn: () => {
			return client.getStream(videoId);
		},
		enabled: !videoIdIsInvalid
	});

	console.log(data, error);

	return <></>;
};
