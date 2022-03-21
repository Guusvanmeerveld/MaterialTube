import packageInfo from "../../../package.json";

import Link from "next/link";

import { FC } from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import { Settings } from "@mui/icons-material";

const MuiDrawer: FC<{
	drawerIsOpen: boolean;
	toggleDrawer: (
		isOpen: boolean
	) => (event: React.KeyboardEvent | React.MouseEvent) => void;
	pages: {
		name: string;
		icon: JSX.Element;
		link: string;
	}[];
}> = ({ drawerIsOpen, toggleDrawer, pages }) => {
	return (
		<Drawer anchor="left" open={drawerIsOpen} onClose={toggleDrawer(false)}>
			<Box
				sx={{ width: 250 }}
				role="presentation"
				onClick={toggleDrawer(false)}
				onKeyDown={toggleDrawer(false)}
			>
				<Box padding={2}>
					<Typography variant="h4">{packageInfo.displayName}</Typography>
				</Box>
				<Divider />
				<List>
					{pages.map((page, index) => (
						<Link key={index} href={page.link} passHref>
							<ListItem button>
								<ListItemIcon>{page.icon}</ListItemIcon>
								<ListItemText primary={page.name} />
							</ListItem>
						</Link>
					))}
					<Divider />
					<Link href="/settings" passHref>
						<ListItem button>
							<ListItemIcon>
								<Settings />
							</ListItemIcon>
							<ListItemText primary="Settings" />
						</ListItem>
					</Link>
				</List>
			</Box>
		</Drawer>
	);
};

export default MuiDrawer;
