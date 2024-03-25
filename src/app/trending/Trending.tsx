"use client";

import { defaultRegion } from "@/constants";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";

import { useClient } from "@/hooks/useClient";

import getRegionCodes from "@/utils/getRegionCodes";

import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";
import { Video } from "@/components/Video";

import { RegionSwitcher } from "./RegionSwitcher";

import { Component } from "@/typings/component";

export const Trending: Component = ({}) => {
	const client = useClient();

	const searchParams = useSearchParams();
	const validRegions = useMemo(() => getRegionCodes(), []);

	const specifiedRegion =
		searchParams.get("region")?.toUpperCase() ?? defaultRegion;

	const [region, regionError] = useMemo(() => {
		const foundRegion = validRegions.find(
			(validRegion) => validRegion.code === specifiedRegion
		);

		if (foundRegion === undefined)
			return [null, new Error(`Region \`${specifiedRegion}\` is invalid`)];

		return [foundRegion, null];
	}, [specifiedRegion, validRegions]);

	const {
		isLoading,
		error: fetchError,
		refetch,
		data
	} = useQuery({
		queryKey: ["trending", region],
		queryFn: () => {
			if (region === null) return;

			return client.getTrending(region.code);
		},
		enabled: regionError === null
	});

	const noDataError = useMemo(() => {
		if (data && data.length === 0)
			return new Error(
				`Could not find any trending video's in region \`${region?.name}\``
			);

		return null;
	}, [data, region]);

	const error: Error | null = regionError ?? fetchError ?? noDataError ?? null;

	return (
		<>
			<Container>
				<div className="flex flex-row items-center gap-4">
					<RegionSwitcher currentRegion={region} regions={validRegions} />
					<h1 className="text-xl">Trending</h1>
				</div>

				{isLoading && !data && <LoadingPage />}
				{error && (
					<div className="flex-1 flex items-center justify-center">
						<div className="text-center">
							<h1 className="text-xl">
								An error occurred loading the trending page
							</h1>
							<h2 className="text-lg">{error.toString()}</h2>
							<Spacer y={2} />
							<Button color="primary" onClick={() => refetch()}>
								Retry
							</Button>
						</div>
					</div>
				)}
				{data && error === null && (
					<div className="grid gap-4 py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{data.map((video) => (
							<Video key={video.id} data={video} />
						))}
					</div>
				)}
			</Container>
		</>
	);
};
