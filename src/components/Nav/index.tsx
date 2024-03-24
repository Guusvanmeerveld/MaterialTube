import NextLink from "next/link";
import { FC } from "react";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from "@nextui-org/navbar";

// import { Search } from "./Search";

export const navHeight = 64;

export const Nav: FC<{ pathname: string }> = ({ pathname }) => {
	const navItems = [
		{
			title: "Trending",
			link: "/trending"
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
