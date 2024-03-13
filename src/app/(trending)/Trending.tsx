"use client";

import { Component } from "@/typings/component";
import { useClient } from "@/hooks/useClient";
import { useQuery } from "@tanstack/react-query";
import { Card, CardFooter, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { CircularProgress } from "@nextui-org/progress";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import formatNumber from "@/utils/formatNumbers";

export const Trending: Component = ({}) => {
	const client = useClient();

	const { isLoading, error, data } = useQuery({
		queryKey: ["trending"],
		queryFn: () => client.getTrending("NL")
	});

	return (
		<div className="container px-4 mx-auto min-h-screen">
			{isLoading && !data && (
				<div className="flex items-center justify-center h-screen">
					<CircularProgress aria-label="Loading trending page..." />
				</div>
			)}
			{data && (
				<div className="grid gap-4 py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{data.map((video) => (
						<Link key={video.id} href={`/watch?v=${video.id}`}>
							<Card radius="lg">
								<CardBody>
									<Image
										alt={video.title}
										className="object-cover"
										height={400}
										src={video.thumbnails[0].url}
										width={600}
									/>
									<p className="text-small absolute bottom-3 right-3 bg-content2 p-1">
										20:41
									</p>
								</CardBody>
								<Divider />
								<CardFooter>
									<div className="max-w-full">
										<p title={video.title} className="truncate">
											{video.title}
										</p>
										<div className="flex flex-row gap-2 justify-start overflow-scroll">
											<p className="text-small tracking-tight text-default-400">
												{video.author.name}
											</p>
											<p className="text-small tracking-tight text-default-400">
												{video.uploaded.toLocaleDateString()}
											</p>

											<p className="text-small tracking-tight text-default-400">
												Views: {formatNumber(video.views)}
											</p>
										</div>
									</div>
								</CardFooter>
							</Card>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};
