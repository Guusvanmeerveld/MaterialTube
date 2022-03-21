import packageInfo from "../../../package.json";

import Link from "next/link";

import { FC, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import {
	History,
	Subscriptions,
	Menu,
	Whatshot,
	PlaylistAddCheck,
	Settings
} from "@mui/icons-material";

import Drawer from "@components/Navbar/Drawer";

const Navbar: FC = () => {
	const [drawerIsOpen, setDrawerState] = useState(false);

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setDrawerState(open);
		};

	const pages = [
		{ name: "Trending", icon: <Whatshot sx={{ mr: 1 }} />, link: "trending" },
		{
			name: "Subscriptions",
			icon: <Subscriptions sx={{ mr: 1 }} />,
			link: "subscriptions"
		},
		{
			name: "Watch History",
			icon: <History sx={{ mr: 1 }} />,
			link: "history"
		},
		{
			name: "Playlists",
			icon: <PlaylistAddCheck sx={{ mr: 1 }} />,
			link: "playlists"
		}
	];

	return (
		<>
			<Drawer
				drawerIsOpen={drawerIsOpen}
				toggleDrawer={toggleDrawer}
				pages={pages}
			/>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" enableColorOnDark>
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2, display: { md: "none", xs: "flex" } }}
							onClick={toggleDrawer(true)}
						>
							<Menu />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ mr: 2 }}>
							{packageInfo.displayName}
						</Typography>
						<Box sx={{ flexGrow: 1, display: { md: "flex", xs: "none" } }}>
							{pages.map((page, i) => (
								<Link key={i} href={"/" + page.link}>
									<a>
										<Button
											sx={{
												my: 2,
												color: "white",
												display: "flex",
												alignItems: "center"
											}}
										>
											{page.icon}
											{page.name}
										</Button>
									</a>
								</Link>
							))}
						</Box>
						<Link href="/settings" passHref>
							<IconButton
								sx={{ display: { md: "flex", xs: "none" } }}
								size="large"
							>
								<Settings />
							</IconButton>
						</Link>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Navbar;
