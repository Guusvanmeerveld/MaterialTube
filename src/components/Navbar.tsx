import packageInfo from "../../package.json";

import Link from "next/link";

import { FC, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import {
	History,
	Subscriptions,
	Menu,
	Whatshot,
	PlaylistAddCheck
} from "@mui/icons-material";

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
				anchor="left"
				open={drawerIsOpen}
				onClose={() => toggleDrawer(false)}
			>
				<Box padding={2}>
					<Typography variant="h4">Yeet</Typography>
				</Box>
				<Divider />
				<List>
					{pages.map((page, index) => (
						<ListItem button key={index}>
							<ListItemIcon>{page.icon}</ListItemIcon>
							<ListItemText primary={page.name} />
						</ListItem>
					))}
				</List>
				<Divider />
			</Drawer>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							onClick={toggleDrawer(true)}
						>
							<Menu />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ mr: 2 }}>
							{packageInfo.displayName}
						</Typography>
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
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Navbar;
