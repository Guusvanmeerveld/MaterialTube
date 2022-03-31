import { FC } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
	blue,
	green,
	amber,
	red,
	cyan,
	teal,
	deepOrange,
	indigo,
	yellow,
	lightBlue,
	orange,
	lime,
	deepPurple,
	lightGreen,
	pink,
	purple
} from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

import ModalBox from "@components/ModalBox";

const colors = [
	red,
	deepOrange,
	orange,
	amber,
	yellow,
	lime,
	lightGreen,
	green,
	teal,
	cyan,
	lightBlue,
	blue,
	indigo,
	deepPurple,
	purple,
	pink
];

const MaterialColorPicker: FC<{
	isOpen: boolean;
	setState: (isOpen: boolean) => void;
	selectedColor: string;
	setColor: (color: string) => void;
}> = ({ setState, isOpen, selectedColor, setColor }) => {
	const theme = useTheme();

	return (
		<Modal
			open={isOpen}
			onClose={() => setState(false)}
			aria-labelledby="color-picker"
			aria-describedby="Pick a material color"
			component="div"
		>
			<ModalBox>
				<Typography gutterBottom variant="h4">
					Pick a color
				</Typography>
				<Grid container spacing={1} columns={12}>
					{colors.map((color, i) => (
						<Grid item key={i}>
							{Object.values(color)
								.slice(0, 10)
								.map((shade, i) => (
									<Box
										onClick={() => setColor(shade)}
										key={i}
										sx={{
											width: 24,
											height: 24,
											backgroundColor: shade,
											borderRadius: "50%",
											border:
												shade == selectedColor
													? {
															borderColor: theme.palette.text.primary,
															borderWidth: 2,
															borderStyle: "solid"
													  }
													: null,
											cursor: "pointer",
											mb: 1
										}}
									></Box>
								))}
						</Grid>
					))}
				</Grid>
			</ModalBox>
		</Modal>
	);
};

export default MaterialColorPicker;
