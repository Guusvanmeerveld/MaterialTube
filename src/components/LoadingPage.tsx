"use client";

import { Component } from "@/typings/component";
import { CircularProgress } from "@nextui-org/progress";

export const LoadingPage: Component = () => {
	return (
		<div className="h-screen container mx-auto flex items-center justify-center">
			<CircularProgress aria-label="Loading page..." />
		</div>
	);
};
