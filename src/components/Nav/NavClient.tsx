"use client";

import { Nav } from ".";

import { usePathname } from "next/navigation";
import { FC } from "react";

export const NavClient: FC = () => {
	const pathname = usePathname();

	return <Nav pathname={pathname} />;
};
