"use client";

import { Component } from "@/typings/component";
import { useSearchParams } from "next/navigation";

export const Watch: Component = () => {
	const searchParams = useSearchParams();

	const videoId = searchParams.get("v");

	return <></>;
};
