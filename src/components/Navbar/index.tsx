import packageInfo from "../../../package.json";

import Link from "next/link";
import { useRouter } from "next/router";

import { FC, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import History from "@mui/icons-material/History";
import Menu from "@mui/icons-material/Menu";
import PlayCircleOutline from "@mui/icons-material/PlayCircleOutline";
import PlaylistAddCheck from "@mui/icons-material/PlaylistAddCheck";
import SearchIcon from "@mui/icons-material/Search";
import Settings from "@mui/icons-material/Settings";
import Subscriptions from "@mui/icons-material/Subscriptions";
import Whatshot from "@mui/icons-material/Whatshot";

import Drawer from "@components/Navbar/Drawer";
import Search, {
	SearchIconWrapper,
	StyledInputBase
} from "@components/Navbar/Search";

export const drawerWidth = 240;

const Navbar: FC = () => {
	const [drawerIsOpen, setDrawerState] = useState(false);
	const router = useRouter();

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
		{ name: "Trending", icon: <Whatshot />, link: "/trending" },
		{
			name: "Subscriptions",
			icon: <Subscriptions />,
			link: "/subscriptions"
		},
		{
			name: "Watch History",
			icon: <History />,
			link: "/history"
		},
		{
			name: "Playlists",
			icon: <PlaylistAddCheck />,
			link: "/playlists"
		}
	];

	return (
		<>
			<Drawer
				width={drawerWidth}
				drawerIsOpen={drawerIsOpen}
				toggleDrawer={toggleDrawer}
				pages={pages}
			/>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="fixed" enableColorOnDark>
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{
								mr: { md: 2, xs: 0 },
								display: { lg: "none", xs: "flex" }
							}}
							onClick={() => setDrawerState(!drawerIsOpen)}
						>
							<Menu />
						</IconButton>

						<Link href="/" passHref>
							<Typography
								variant="h6"
								component="div"
								sx={{
									mr: 2,
									display: "flex",
									alignItems: "center",
									cursor: "pointer"
								}}
							>
								<PlayCircleOutline sx={{ mr: 1 }} />
								{process.env.NEXT_PUBLIC_APP_NAME}
							</Typography>
						</Link>

						<Box
							sx={{
								flexGrow: 1,
								display: "flex",
								alignItems: "center"
							}}
						>
							{pages.map((page, i) => (
								<Link key={i} href={page.link} passHref>
									<Tooltip title={`Go to ${page.name}`}>
										<Button
											sx={{
												color: "white",
												display: { lg: "flex", xs: "none" },
												alignItems: "center"
											}}
										>
											<Box
												sx={{ mr: 1, display: "flex", alignItems: "center" }}
											>
												{page.icon}
											</Box>
											{page.name}
										</Button>
									</Tooltip>
								</Link>
							))}

							<Search>
								<SearchIconWrapper>
									<SearchIcon />
								</SearchIconWrapper>
								<form action={`${router.basePath}/results`} method="get">
									<StyledInputBase
										name="search_query"
										placeholder="Search…"
										inputProps={{ "aria-label": "search" }}
									/>
								</form>
							</Search>
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
