import React from "react";
import BreadCrumbs from "../../components/index/breadCrumbs.js";
import {
	Container,
	Card,
	CardContent,
	Grid,
	Divider,
	Link,
	Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	avatar: {
		height: theme.spacing(6),
		width: theme.spacing(6),
	},
}));

const BlogContainer = (props) => {
	const classes = useStyles();
	const postList = props.data.map((post) => (
		<Grid item xs={12} style={{ width: "1000px" }} key={post.id}>
			<Link href={`blog/${post.id}`} style={{ textDecoration: "none" }}>
				<Card elevation={0}>
					<CardContent style={{ paddingTop: 0 }}>
						<Grid
							container
							style={{
								direction: "column",
								alignItems: "center",
							}}
						>
							<Grid
								item
								xs={9}
								style={{ position: "relative", left: "5px" }}
							>
								<div>
									<Avatar
										className={classes.avatar}
										src="/images/avatar3.jpg"
										style={{
											display: "inline-block",
											margin: "5px",
											marginLeft: "0px",
										}}
									/>
									<span
										style={{
											fontWeight: 550,
											fontSize: "12px",
											position: "relative",
											left: "11px",
											bottom: "23px",
											// color: "darkgrey",
										}}
									>
										{post.writer}&nbsp;&nbsp;
									</span>
								</div>
								<h2 style={{ marginBottom: "5px" }}>
									{post.title}
								</h2>
								<div
									style={{
										color: "#555251",
										fontWeight: 300,
										marginLeft: "15px",
									}}
								>
									{post.content}
								</div>
							</Grid>
							<Grid
								item
								xs={3}
								style={{
									position: "relative",
									left: "30px",
									top: "10px",
								}}
							>
								<img
									src={`${post.img}`}
									alt="card index"
									style={{
										display: "block",
										// height: "100%",
										// width: "100%",
										maxHeight: "180px",
									}}
								/>
							</Grid>
							<div
								style={{
									position: "relative",
									top: "10px",
									color: "#BCBCBC",
									fontSize: "14px",
									// display: "flex",
									// justifyContent: "flex-end",
								}}
							>
								<span
									style={{
										padding: "15px 0px",
									}}
								>
									{post.date}&nbsp;| 조회수 : {post.view}
									&nbsp;&nbsp;
								</span>
							</div>
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
			<Grid
				container
				spacing={2}
				direction="column"
				alignItems="center"
				style={{ margin: "10px 0px" }}
			>
				{postList}
			</Grid>
		</Container>
	);
};

export default BlogContainer;
