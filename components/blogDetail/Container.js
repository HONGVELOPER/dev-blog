import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import BreadCrumbs from "../index/breadCrumbs.js";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import router from "next/router";
import Modal from "../posting/modal";
import parse from "html-react-parser";

const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: "100",
	},
}));

function BlogDetailContainer(props) {
	const classes = useStyles();
	const [show, setShow] = useState(false);

	function showHandler(showResult) {
		setShow(showResult);
	}

	const deletePost = async () => {
		const response = await axios.delete("/api/blog/post", {
			params: {
				id: props.data.id,
			},
		});
		if (response.status === 200) {
			alert("블로그 포스팅이 정상적으로 삭제되었습니다.");
			router.push("./");
		} else {
			alert("ERROR");
		}
	};

	return (
		<Container style={{ maxWidth: 800 }}>
			<Grid item xs={12} style={{ marginTop: 10 }}>
				<BreadCrumbs />
			</Grid>
			<Grid container>
				<Grid item xs={12}>
					<div className={classes.title}>
						<div
							style={{
								marginBottom: 0,
								fontSize: 50,
								fontWeight: 600,
								marginTop: 20,
							}}
						>
							{props.data.title}
						</div>
					</div>
					<div
						style={{
							marginTop: "0px",
							marginBottom: "35px",
							// fontWeight: "100",
							color: "#555251",
							fontWeight: 300,
						}}
					>
						<span>
							{props.data.date}&nbsp;&nbsp; 조회수:{" "}
							{props.data.view}
						</span>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div>{parse(props.data.content)}</div>
				</Grid>
			</Grid>
			<div>
				{show ? (
					<>
						<Button variant="text" onClick={deletePost}>
							delete
						</Button>
					</>
				) : (
					<>
						<Modal passwordCheck={showHandler} />
					</>
				)}
			</div>
		</Container>
	);
}

export default BlogDetailContainer;
