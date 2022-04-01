import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 750,
			md: 870,
			lg: 1280,
			xl: 1920,
		},
	},
});

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 10,
		position: "relative",
		left: "20px",
	},
	indexText: {
		fontSize: "42px",
		fontWeight: 600,
		paddingTop: "12vh",
		paddingBottom: "11vh",
		paddingLeft: "7vw",
		minHeight: "520px",
	},
	mobileIndexText: {
		fontSize: "6vw",
		fontWeight: 600,
		paddingTop: "5vh",
		paddingBottom: "2vh",
		paddingLeft: "5vw",
	},
	indexImage: {
		position: "relative",
		maxWidth: "450px",
		padding: 30,
		bottom: "20px",
	},
}));

const IndexContainer = () => {
	const classes = useStyles();
	const [mobile, setMobile] = useState(null);
	const divide = 870;

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

	return (
		<>
			<Container className={classes.root}>
				<Grid container>
					<MuiThemeProvider theme={theme}>
						<Grid item xs={12} md={5}>
							{mobile ? (
								<div className={classes.mobileIndexText}>
									안녕하세요,
									<br />
									코드를 통해
									<br />
									생각을 표현하는 개발자
									<br />
									<span style={{ color: "#218e16" }}>
										홍영진
									</span>
									입니다.
									<div
										style={{
											fontSize: "3vw",
											marginTop: "20px",
										}}
									>
										성장하는 개발자가 될 것입니다.
									</div>
								</div>
							) : (
								<div className={classes.indexText}>
									안녕하세요,
									<br />
									코드를 통해 생각을
									<br />
									표현하는
									<br />
									개발자{" "}
									<span style={{ color: "#218e16" }}>
										홍영진
									</span>
									입니다.
									<div
										style={{
											fontSize: "20px",
											marginTop: "20px",
										}}
									>
										성장하는 개발자가 될 것입니다.
									</div>
								</div>
							)}
						</Grid>
						<Grid item xs={1} />
						<Grid
							item
							xs={12}
							md={6}
							className={classes.indexImage}
						>
							{mobile ? (
								<Image
									src={"/images/main.png"}
									width={100}
									height={80}
									layout="responsive"
									quality={60}
								/>
							) : (
								<Image
									src={"/images/main.png"}
									layout="fill"
									objectFit="contain"
									quality={60}
								/>
							)}
						</Grid>
					</MuiThemeProvider>
				</Grid>
			</Container>
		</>
	);
};

export default IndexContainer;
