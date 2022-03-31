import Box from "@mui/material/Box";

import styled from "@mui/system/styled";

const ModalBox = styled(Box)(({ theme }) => ({
	padding: "2rem",
	position: "absolute",
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	minWidth: "20rem",
	backgroundColor: theme.palette.background.paper,
	borderRadius: 5,
	outline: "none"
}));

export default ModalBox;
