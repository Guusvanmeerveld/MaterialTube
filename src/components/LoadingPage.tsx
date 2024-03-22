"use client";

import { CircularProgress } from "@nextui-org/progress";

import { Component } from "@/typings/component";

export const LoadingPage: Component = () => {
	return (
		<div className="flex flex-1 justify-center items-center">
			<CircularProgress aria-label="Loading page..." />
		</div>
	);
};
