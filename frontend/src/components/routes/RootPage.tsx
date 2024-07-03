import React from "react";
import {Outlet} from "react-router";
import "./RootPage.sass";
import Navbar from "../Navbar";

const RootPage = () => {
	return (
		<div className={"main-page"}>
			<div className={"nav-bar"}>
				<Navbar />
			</div>
			<div className={"site-body"}>
				<Outlet/>
			</div>
		</div>
	)
};

export default RootPage;
