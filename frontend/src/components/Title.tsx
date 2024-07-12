import React, {ReactNode} from "react";
import {Typography} from "@mui/material";
import styled from "@emotion/styled";

const TitleTypography = styled(Typography)`
	text-align: center;
`;

const Title = ({children}: {children: ReactNode}) => {
	return (
		<TitleTypography variant={"h1"}>
			{ children }
		</TitleTypography>
	)
};

export default Title;
