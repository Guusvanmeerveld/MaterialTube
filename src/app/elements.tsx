"use client";

import { Nav } from "@/components/Nav";

import { Component } from "@/typings/component";

export const Elements: Component = ({ children }) => {
	return (
		<>
			<Nav />
			{children}
		</>
	);
};
