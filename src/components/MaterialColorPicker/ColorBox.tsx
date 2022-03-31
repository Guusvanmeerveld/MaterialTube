import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

interface ColorBoxProps {
	color: string;
}

const ColorBox = styled(Box, {
	shouldForwardProp: (prop) => prop !== "color"
})<ColorBoxProps>(({ theme, color }) => ({
	width: 24,
	height: 24,
	backgroundColor: color,
	borderRadius: "50%",
	borderColor: theme.palette.text.primary,
	borderWidth: 2,
	borderStyle: "solid"
}));

export default ColorBox;
