import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#218e16',
		height: '200px',
		display: 'flex',
		alignItems: 'center'
	},
	text: {
		textAlign: 'center',
		paddingTop: '20px',
		fontSize: '18px',
		fontWeight: 400,
	},
	icon: {
		textAlign: 'center',
	},
	hover: {
		color: 'black',
		'&:hover': {
			color: 'white',
			backgroundColor: 'transparent'
		}
	}
}))

const footer = () => {

	const classes = useStyles()

	return (
		<>
			<div className={classes.root}>
				<Container>
					<div className={classes.icon}>
						<Button className={classes.hover} href="https://github.com/Young-Jin1003">
							<GitHubIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover}>
							<MailIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover} href="https://www.instagram.com/dudwls.h/">
							<InstagramIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover} href="https://www.facebook.com/profile.php?id=100006042941738">
							<FacebookIcon color="inherit" fontSize="large" />
						</Button>
					</div>
					<Grid container className={classes.text}>
						<Grid item xs={12}>
							Copyright ⓒ 2021 DEVHONG All Rights Reserved.
						</Grid>
					</Grid>
				</Container>
			</div>
		</>
	)
}

export default footer