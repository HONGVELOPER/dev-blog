import React, { createRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		paddingTop: 0,
	},
	comments: {
		"& div": {
			maxWidth: "100%",
		},
	},
}));

const commentContainer = () => {
	const classes = useStyles();
	const commentRef = createRef();

	useEffect(() => {
		const utterances = document.createElement("script");

		const utterancesConfig = {
			src: "https://utteranc.es/client.js",
			repo: "HONGVELOPER/dev-blog",
			theme: "github-light",
			"issue-term": "pathname",
			async: true,
			crossorigin: "anonymous",
		};

		Object.entries(utterancesConfig).forEach(([key, value]) => {
			utterances.setAttribute(key, value);
		});

		commentRef.current.appendChild(utterances);
	}, []);

	return (
		<Container style={{ width: "1000px" }}>
			<h3 style={{ marginBottom: 5 }}>Comments</h3>
			<Divider />
			<div className={classes.comments} ref={commentRef} />
		</Container>
	);
};

export default commentContainer;
