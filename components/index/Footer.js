import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#218e16',
		height: '250px',
		display: 'flex',
		alignItems: 'center'
	},
	text: {
		textAlign: 'center',
		paddingTop: '20px',
		fontSize: '18px',
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
						<Button className={classes.hover} href="">
							<GitHubIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover}>
							<MailIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover}>
							<InstagramIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover}>
							<FacebookIcon color="inherit" fontSize="large" />
						</Button>
					</div>
					<div className={classes.text}>
						Copyright ⓒ 2021 DEVHONG All Rights Reserved.
					</div>
				</Container>
			</div>
		</>
	)

}

export default footer