import NextLink from "next/link";
import { FC } from "react";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";

export const navHeight = 64;

export const Nav: FC<{ pathname: string }> = ({ pathname }) => {
	const navItems = [
		{
			title: "Trending",
			link: "/trending"
		},
		{
			title: "Search",
			link: "/results"
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
						<NavbarItem isActive={isActive} key={item.title.toLowerCase()}>
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
