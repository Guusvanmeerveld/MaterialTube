"use client";

import { usePathname } from "next/navigation";
import { FC } from "react";

import { Nav } from "./Nav";

export const NavClient: FC = () => {
	const pathname = usePathname();

	return <Nav pathname={pathname} />;
};
