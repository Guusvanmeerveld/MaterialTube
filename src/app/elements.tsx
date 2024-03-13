"use client";

import { Nav } from "@/components/Nav";

export function Elements({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Nav />
			{children}
		</>
	);
}
