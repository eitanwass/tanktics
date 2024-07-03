import React from "react";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

const Navbar = () => {
	return (
		<AppBar position={"static"}>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					MyApp
				</Typography>
				<Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
					<Button color={"inherit"}>Browse</Button>
					<Button color={"inherit"}>My Games</Button>
					<Button color={"inherit"}>Customize</Button>
				</Box>
				<IconButton
					size={"large"}
					edge={"end"}
					color={"inherit"}
					aria-label={"Current user account"}
				>
					<AccountCircle/>
				</IconButton>
			</Toolbar>
		</AppBar>
	)
};

export default Navbar;
