"use client";

import { Component } from "@/typings/component";
import { CircularProgress } from "@nextui-org/progress";

export const LoadingPage: Component = () => {
	return (
		<div className="flex flex-1 justify-center items-center">
			<CircularProgress aria-label="Loading page..." />
		</div>
	);
};
