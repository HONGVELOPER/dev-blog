import React from "react";
import BreadCrumbs from "../../components/index/breadCrumbs.js";
import {
	Container,
	Card,
	CardContent,
	Grid,
	Divider,
	Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const BlogContainer = (props) => {
	const postList = props.data.map((post) => (
		<Grid item xs={12} style={{ width: "1000px" }} key={post.id}>
			<Link href={`blog/${post.id}`} style={{ textDecoration: "none" }}>
				<Card elevation={0}>
					<CardContent>
						<Grid
							container
							spacing={0}
							// style={{
							// 	alignItems: "center",
							// }}
						>
							<Grid
								item
								xs={3}
								style={{
									position: "relative",
									top: "10px",
									maxWidth: "180px",
									height: "150px",
								}}
							>
								<img
									src={`${post.thumbNail}`}
									alt="blog post image"
									style={{
										display: "block",
										objectFit: "cover",
										width: "100%",
										height: "100%",
										boxShadow:
											"3px 3px 6px rgb(60,92,94, 0.3)",
										borderRadius: "6px",
									}}
								/>
							</Grid>
							<Grid item xs={9} style={{ paddingLeft: "30px" }}>
								<div
									style={{
										marginBottom: "5px",
										fontSize: "20px",
										fontWeight: "1000	",
										margin: "15px 0px 15px 0px",
									}}
								>
									{post.title}
								</div>
								<p
									style={{
										color: "#7f7f7f",
										fontWeight: 300,
										fontSize: "13px",
										lineHeight: "23px",
										fontWeight: "500",
									}}
								>
									{post.content}
								</p>
								<div
									style={{
										color: "#7f7f7f",
										fontSize: "12px",
									}}
								>
									<span
										style={{
											padding: "15px 0px",
										}}
									>
										{post.author}&nbsp;&nbsp; {post.date}
										&nbsp;| 조회수 : {post.viewCount}
										&nbsp;&nbsp;
									</span>
								</div>
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
			<Grid
				container
				spacing={0}
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
