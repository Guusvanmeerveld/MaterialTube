import { FC } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loading: FC = () => (
	<Box
		sx={{
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			mt: 5
		}}
	>
		<CircularProgress />
	</Box>
);

export default Loading;
