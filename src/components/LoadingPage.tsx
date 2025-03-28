"use client";

import { FC } from "react";

import { CircularProgress } from "@heroui/progress";

export const LoadingPage: FC<{ text?: string }> = ({ text }) => (
	<div className="flex flex-1 justify-center items-center">
		<div className="flex flex-col gap-2 items-center">
			<CircularProgress aria-label="Loading page..." />
			{text && <p className="text-xl">{text}</p>}
		</div>
	</div>
);
