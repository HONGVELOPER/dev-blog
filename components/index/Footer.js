import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#218e16',
		height: '210px',
		display: 'flex',
		alignItems: 'center'
	},
	text: {
		textAlign: 'center',
		paddingTop: '20px',
		fontSize: '18px',
		fontWeight: 400,
		color: 'white',
	},
	icon: {
		textAlign: 'center',
	},
	hover: {
		color: 'white',
		'&:hover': {
			color: 'black',
			backgroundColor: 'transparent'
		}
	},
	modal: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	paper: {
		textAlign: 'center',
		width: 600,
		height: 450,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
	},
	title: {
		width: 400
	},
	text: {
		width: 400,
		marginTop: 100,
	}
}))

const footer = () => {

	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')

	const openHandler = () => {
		console.log('진입')
		setOpen(true)
	}

	const closeHandler = () => {
		setOpen(false)
	}

	const textHandler = (e) => {
		setText(e.target.value)
	}

	const titleHandler = (e) => {
		setTitle(e.target.value)
	}

	const mailSend = async () => {
		console.log(title, 'title')
		console.log(text, 'check')
		const response = await axios.post('/api/mail', {
			title: title,
			text: text,
		})
		console.log(response, 'response check')
		if (response.status === 200) {
			alert('메일이 정상적으로 전송되었습니다')
		} else {
			alert('ERROR')
		}
		closeHandler()
	}

	return (
		<>
			<div className={classes.root}>
				<Container>
					<div className={classes.icon}>
						<Button className={classes.hover} href="https://github.com/Young-Jin1003">
							<GitHubIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover} onClick={openHandler}>
							<MailIcon color="inherit" fontSize="large" />
						</Button>
						<Modal
							open={open}
							onClose={closeHandler}
							className={classes.modal}
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
						>
							<div className={classes.paper}>
								<div style={{padding: 30}}>
									Enter your Text
								</div>
								<Divider variant="middle" />
								<TextField
									// required
									className={classes.title}
									label="Enter your title"
									onChange={titleHandler}
									defaultValue={title}
								/>
								<TextField
									// required
									className={classes.text}
									label="Enter your text"
									onChange={textHandler}
									defaultValue={text}
								/>
								<div style={{marginTop: 100, display: 'flex', marginLeft: 100, marginRight: 100}}>
									<Button href="/blog">Back</Button>
									<Button style={{marginLeft: 'auto'}} onClick={mailSend}>Send</Button>
								</div>
							</div>
						</Modal>
						<Button className={classes.hover} href="https://www.instagram.com/dudwls.h/">
							<InstagramIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover} href="https://www.facebook.com/profile.php?id=100006042941738">
							<FacebookIcon color="inherit" fontSize="large" />
						</Button>
					</div>
					<Grid container className={classes.text}>
						<Grid item xs={12}>
							Copyright ⓒ 2021 DEV HONG All Rights Reserved.
						</Grid>
					</Grid>
				</Container>
			</div>
		</>
	)
}

export default footer