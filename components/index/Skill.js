import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "3vw",
		fontSize: "1.5vw",
	},
	skill: {
		fontSize: "32px",
		textAlign: "center",
		"&::after": {
			content: "''",
			display: "block",
			width: "60px",
			borderBottom: "3px solid #218e16",
			margin: "10px auto",
		},
	},
	card: {
		borderRadius: 10,
		boxShadow: "3px 3px 3px #3c5c5e",
		display: "inline-block",
		marginLeft: "10px",
		marginBottom: "10px",
		width: "6.5vw",
		minWidth: "73px",
	},
	skillDesc: {
		fontSize: "25px",
		marginTop: "2vh",
	},
}));

const Skill = (props) => {
	const classes = useStyles();
	const [mobile, setMobile] = useState(null);
	const divide = 800;

	useEffect(() => {
		if (mobile === null) {
			window.innerWidth < divide ? setMobile(true) : setMobile(false);
		}
		window.addEventListener(
			"resize",
			function () {
				window.innerWidth < divide ? setMobile(true) : setMobile(false);
			},
			{ passive: true }
		);
	});

	useEffect(() => {
		if (props.toSkill) {
			document
				.querySelector(".skill")
				.scrollIntoView({ behavior: "smooth" });
			props.scrollChange(false);
		}
	});

	const frontEnd = [
		"javascript",
		"html",
		"css",
		"react",
		"next",
		"material-ui",
		"vue",
		"nuxt",
		"vuetify",
	];

	const backEnd = [
		"node",
		"express",
		"mysql",
		"sequelize",
		"nest",
		"graphql",
		"postgresql",
	];

	const devOps = ["aws", "docker", "git", "github"];

	const frontEndList = frontEnd.map((name) => (
		<Card
			key={name}
			variant="outlined"
			elevation={10}
			className={classes.card}
		>
			<CardContent style={{ padding: 0 }}>
				<Image
					src={`/images/frontend/${name}.svg`}
					width={100}
					height={100}
					layout="responsive"
				/>
			</CardContent>
			<Divider variant="middle" />
		</Card>
	));

	const backEndList = backEnd.map((name) => (
		<Card
			key={name}
			variant="outlined"
			elevation={10}
			className={classes.card}
		>
			<CardContent style={{ padding: 0 }}>
				<Image
					src={`/images/backend/${name}.svg`}
					width={100}
					height={100}
					layout="responsive"
				/>
			</CardContent>
			<Divider variant="middle" />
		</Card>
	));

	const devOpsList = devOps.map((name) => (
		<Card
			key={name}
			variant="outlined"
			elevation={10}
			className={classes.card}
		>
			<CardContent style={{ padding: 0 }}>
				<Image
					src={`/images/devops/${name}.svg`}
					width={100}
					height={100}
					layout="responsive"
				/>
			</CardContent>
			<Divider variant="middle" />
		</Card>
	));

	return (
		<>
			<Container style={{ maxWidth: "1100px" }}>
				<section className={classes.root}>
					<div
						className="skill"
						style={{
							color: "#218e16",
							fontSize: "29px",
							fontWeight: 600,
						}}
					>
						Skills
					</div>
					<div
						style={{
							fontSize: "15px",
							paddingTop: "1vw",
							fontWeight: 50,
						}}
					>
						웹 개발을 하며 사용해본 기술 스택입니다.
					</div>
					<Grid container spacing={5} style={{ marginTop: 30 }}>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12}>
									<Typography
										variant="h6"
										border={1}
										gutterBottom
										className={classes.skillDesc}
									>
										Front-End
									</Typography>
									{frontEndList}
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="h6"
										border={1}
										gutterBottom
										className={classes.skillDesc}
									>
										Back-End
									</Typography>
									{backEndList}
								</Grid>
								<Grid item xs={12}>
									<Typography
										variant="h6"
										border={1}
										gutterBottom
										className={classes.skillDesc}
									>
										DevOps
									</Typography>
									{devOpsList}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</section>
				<Divider style={{ marginTop: "50px" }} />
			</Container>
		</>
	);
};

export default Skill;
