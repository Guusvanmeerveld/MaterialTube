"use client";

import { Component } from "@/typings/component";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const Nav: Component = () => {
	const navItems = [
		{
			title: "Trending",
			link: "/"
		},
		{
			title: "Subscriptions",
			link: "/subscriptions"
		},
		{
			title: "History",
			link: "/history"
		}
	];

	const pathname = usePathname();

	return (
		<Navbar>
			<NavbarBrand>
				{/* <AcmeLogo /> */}
				<p className="font-bold text-inherit">MaterialTube</p>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{navItems.map((item) => {
					const isActive: boolean = pathname === item.link;

					return (
						<NavbarItem key={item.title.toLowerCase()} isActive={isActive}>
							<Link
								as={NextLink}
								color={isActive ? "primary" : "foreground"}
								href={item.link}
							>
								{item.title}
							</Link>
						</NavbarItem>
					);
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<Button as={NextLink} color="primary" href="/settings" variant="flat">
						Settings
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
