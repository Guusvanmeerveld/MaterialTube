import { Suspense } from "react";

import { Nav } from "@/components/Nav/Nav";
import { NavClient } from "@/components/Nav/NavClient";

import { Component } from "@/typings/component";

export const Elements: Component = ({ children }) => {
	return (
		<>
			<Suspense fallback={<Nav pathname="" />}>
				<NavClient />
			</Suspense>

			{children}
		</>
	);
};
