import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BreadCrumbs from "../../components/index/breadCrumbs.js";
import SpaIcon from "@material-ui/icons/Spa";
import {
	Container,
	Card,
	CardContent,
	Grid,
	Divider,
	Link,
} from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#218e16",
		},
	},
	status: {
		danger: "orange",
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 750,
			md: 1100,
			lg: 1280,
			xl: 1920,
		},
	},
});

const useStyles = makeStyles((theme) => ({
	card: {
		transition: "0.5s",
		"&:hover": {
			opacity: 0.5,
			transform: "translateY(-10px)",
		},
	},
	bottom: {
		display: "block",
		marginLeft: "15px",
		height: "20px",
		"&:hover": {
			transition: "0.5s",
			"&:after": {
				content: "''",
				display: "block",
				width: "60px",
				borderBottom: "3px solid #218e16",
				margin: "10px auto",
			},
		},
	},
	img: {
		objectFit: "fill",
	},
	blogTitle: {
		marginTop: "5px",
		marginBottom: "15px",
		fontSize: "24px",
		fontWeight: 600,
		height: "70px",
	},
	blogContent: {
		height: "45px",
		color: "#73716b",
		fontSize: "12px",
	},
	blogWriter: {
		marginTop: "20px",
		fontSize: "10px",
		fontWeight: 200,
	},
}));

const BlogContainer = (props) => {
	console.log(props, "props");
	const classes = useStyles();

	const postList = props.data.map((post) => (
		<Grid item xs={12} style={{ width: "1000px" }}>
			<Link href={`blog/${post.id}`} style={{ textDecoration: "none" }}>
				<Card elevation={0}>
					<CardContent>
						<Grid container>
							<Grid
								item
								xs={10}
								style={{ position: "relative", left: "20px" }}
							>
								<h2>{post.title}</h2>
								<div>{post.content}</div>
								<span>
									<span style={{ color: "#89a7c6" }}>
										{post.writer}&nbsp;&nbsp;
									</span>
									<span
										style={{
											position: "relative",
											top: "1px",
											color: "#BCBCBC",
											fontSize: "14px",
											padding: "15px 0px",
										}}
									>
										{post.date}
									</span>
								</span>
							</Grid>
							<Grid item xs={2}>
								<img
									src={`${post.img}`}
									alt="card index"
									style={{
										display: "block",
										height: "100%",
										width: "100%",
									}}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Link>
			<Divider />
		</Grid>
	));

	return (
		<Container style={{ width: "1100px" }}>
			<Grid item xs={12} style={{ marginTop: 10, marginLeft: 30 }}>
				<BreadCrumbs style={{ display: "inlineBlock" }} />
			</Grid>
			<Grid container spacing={2} direction="column" alignItems="center">
				{postList}
			</Grid>
		</Container>
	);
};

export default BlogContainer;
