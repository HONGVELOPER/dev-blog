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
	img: {
		height: "400px",
		width: "600px",
	},
	fixed: {
		position: "fixed",
	},
	list: {
		"&:hover": {
			color: "#218e16",
		},
	},
	button: {
		fontSize: "15px",
		padding: 0,
		paddingBottom: "5px",
		transition: "0.5s",
		"& .MuiTouchRipple-root span": {
			backgroundColor: "#FFF",
		},
		"&:hover": {
			color: "#218e16",
			backgroundColor: "#FFF",
			transform: "translateY(-5px)",
		},
		"&:focus": {
			color: "#218e16",
		},
	},
}));

function BlogDetailContainer(props) {
	const classes = useStyles();
	const [mobile, setMobile] = useState(null);
	const [show, setShow] = useState(false);
	const divide = 1000;

	function showHandler(showResult) {
		setShow(showResult);
	}

	useEffect(() => {
		if (mobile === null) {
			window.innerWidth < divide ? setMobile(true) : setMobile(false);
		} else {
			window.addEventListener(
				"resize",
				function () {
					window.innerWidth < divide
						? setMobile(true)
						: setMobile(false);
				},
				{ passive: true }
			);
		}
	});

	const moveByToc = (event) => {
		document
			.querySelector(
				`.ul-${props.data.tocData.indexOf(event.target.innerHTML)}`
			)
			.scrollIntoView({ behavior: "smooth" });
	};

	const toc = props.data.tocData.map((list) => (
		<li key={list} className={classes.list}>
			<Button className={classes.button} onClick={moveByToc}>
				{list}
			</Button>
		</li>
	));

	const deletePost = async () => {
		const response = await axios.delete("/api/blog", {
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
		<Container style={{ width: "1000px" }}>
			<Grid container spacing={2} style={{ marginTop: "0px" }}>
				<Grid item xs={12}>
					<BreadCrumbs />
				</Grid>
				{mobile ? (
					<Grid container>
						<Grid item xs={12}>
							<div className={classes.title}>
								<h1 style={{ marginBottom: 0 }}>
									{props.data.title}
								</h1>
							</div>
							<div
								style={{
									marginTop: "10px",
									marginBottom: "35px",
									fontWeight: "100",
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
				) : (
					<>
						<Grid item xs={10}>
							<div className={classes.title}>
								<h1 style={{ marginBottom: 0 }}>
									{props.data.title}
								</h1>
							</div>
							<div
								style={{
									marginTop: "10px",
									marginBottom: "35px",
									fontWeight: "100",
								}}
							>
								<span>
									{props.data.date}&nbsp;&nbsp; 조회수:{" "}
									{props.data.view}
								</span>
							</div>
						</Grid>
						<Grid item xs={2}>
							<div className={classes.fixed}>
								<ul>{toc}</ul>
							</div>
						</Grid>
						<Grid item xs={10}>
							<div>{parse(props.data.content)}</div>
						</Grid>
					</>
				)}
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
