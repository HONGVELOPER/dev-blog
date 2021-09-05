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
	footerText: {
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
		padding: '20px'
	},
	paper: {
		textAlign: 'center',
		width: 600,
		height: 430,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
	},
	title: {
		maxWidth: '450px',
		width: '80vw',
		marginTop: '10px',
	},
	text: {
		maxWidth: '450px',
		width: '80vw',
		marginTop: 30,
	}
}))

const footer = () => {

	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [mobile, setMobile] = useState(null)
	const divide = 800

	useEffect(() => {
		if (mobile === null) {
		  	window.innerWidth < divide ? setMobile(true) : setMobile(false)
		} else {
		  	window.addEventListener('resize', function() {
				window.innerWidth < divide ? setMobile(true) : setMobile(false)
		  	}, {passive: true})
		}
	})

	const openHandler = () => {
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
						<Button className={classes.hover} href="https://www.instagram.com/dudwls.h/">
							<InstagramIcon color="inherit" fontSize="large" />
						</Button>
						<Button className={classes.hover} href="https://www.facebook.com/profile.php?id=100006042941738">
							<FacebookIcon color="inherit" fontSize="large" />
						</Button>
						<Grid container>
							<Grid item xs={12}>
								<Modal
									open={open}
									onClose={closeHandler}
									className={classes.modal}
								>
									<div className={classes.paper}>
										<div style={{padding: 30, paddingBottom: 10, fontSize: '20px', color: '#218e16'}}>
											Contect&nbsp; with&nbsp; Me&nbsp; by&nbsp; Mail 
											{/* Please contact us by email */}
										</div>
										{/* <Divider variant="middle" style={{backgroundColor: '#218e16'}} /> */}
										<Divider variant="middle" />
										<div>
											<TextField
												className={classes.title}
												label="제목을 입력해주세요."
												onChange={titleHandler}
												defaultValue={title}
											/>
										</div>
										<TextField
											className={classes.text}
											variant="outlined"
											label="내용을 입력해주세요."
											onChange={textHandler}
											defaultValue={text}
											multiline
											rows={7}
										/>
										<div style={{marginTop: 30, marginLeft: '7vw', marginRight: '7vw', display: 'flex'}}>
											<Button onClick={closeHandler}>Cancel</Button>
											<Button style={{marginLeft: 'auto'}} onClick={mailSend}>Send</Button>
										</div>
									</div>
								</Modal>
							</Grid>
						</Grid>
					</div>
					<Grid container className={classes.footerText}>
						<Grid item xs={12}>
							{mobile ? (
								<div>Copyright ⓒ 2021 <br/>DEV HONG All Rights Reserved.</div>
							) : (
								<div>Copyright ⓒ 2021 DEV HONG All Rights Reserved.</div>
							)}
						</Grid>
					</Grid>
				</Container>
			</div>
		</>
	)
}

export default footer