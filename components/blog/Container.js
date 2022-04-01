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
											top: "2px",
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

	const contentList = props.data.map((content) => (
		<MuiThemeProvider theme={theme} key={content.id}>
			<Grid
				item
				xs={12}
				sm={6}
				md={4}
				style={{ padding: 10, minWidth: 300 }}
			>
				<Link href={`blog/${content.id}`}>
					<Card
						elevation={5}
						className={classes.card}
						style={{ height: "450px", maxWidth: "400px" }}
					>
						<CardContent style={{ padding: 0, height: "250px" }}>
							<img
								src={`${content.img}`}
								alt="card index"
								style={{
									display: "block",
									height: "100%",
									width: "100%",
								}}
							/>
							{/* <Image src={`${content.img}`} alt="img" width={300} height={300} /> */}
						</CardContent>
						<Divider
							variant="middle"
							style={{ position: "relative", top: 7 }}
						/>
						<div style={{ padding: "5px" }}>
							<div className={classes.blogTitle}>
								<div>{content.title}</div>
							</div>
							<div className={classes.blogContent}>
								{content.content}
							</div>
							<Grid container className={classes.blogWriter}>
								<Grid
									item
									xs={12}
									style={{
										paddingTop: "2px",
										display: "block",
									}}
								>
									<SpaIcon />
									<div
										style={{
											marginLeft: "5px",
											display: "inline-block",
										}}
									>
										<div>
											<span
												style={{
													fontWeight: 500,
													fontSize: "12px",
												}}
											>
												{content.writer}님이 작성함
											</span>
										</div>
										<div
											style={{
												fontWeight: 500,
												fontSize: "12px",
												bottom: "1px",
												position: "relative",
											}}
										>
											{content.date} &nbsp;&nbsp;조회수:{" "}
											<span style={{ fontSize: "12px" }}>
												{content.view}
											</span>
										</div>
									</div>
								</Grid>
							</Grid>
						</div>
					</Card>
				</Link>
			</Grid>
		</MuiThemeProvider>
	));

	return (
		<Container>
			<Grid item xs={12} style={{ marginTop: 10, marginLeft: 30 }}>
				<BreadCrumbs style={{ display: "inlineBlock" }} />
			</Grid>
			<Grid container spacing={2} direction="column" alignItems="center">
				{postList}
			</Grid>
			{/* <Grid container spacing={3}>
				{contentList}
			</Grid> */}
		</Container>
	);
};

export default BlogContainer;
