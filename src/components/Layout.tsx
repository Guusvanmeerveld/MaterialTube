import { FC } from "react";

import Box from "@mui/material/Box";

import Navbar from "@components/Navbar";

const Layout: FC = ({ children }) => (
	<>
		<Navbar />
		<Box
			sx={{ height: { sm: 64, xs: 56 }, display: "block", width: "100%" }}
		></Box>
		{children}
	</>
);

export default Layout;
