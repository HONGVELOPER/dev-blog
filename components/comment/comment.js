import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		paddingTop: 0
		// maxWidth: 360,
	},
	inline: {
		display: 'inline'
	},
	button: {
		marginLeft: '62px',
	}
}))

const container = () => {
	const router = useRouter()
	const classes = useStyles()
	const [comment, setComment] = useState('')
	const [depth, setDepth] = useState(0)
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	// const [open, setOpen] = useState(false)

	// const openHandler = () => {
	// 	setOpen(true)
	// }

	// const closeHandler = () => {
	// 	setOpen(false)
	// }

	const commentHandler = (e) => {
		console.log(e.target.value, 'event')
		setComment(e.target.value)
	}

	const depthHandelr = () => {
		console.log(depth)
		setDepth(depth + 1)
	}

	const replyHandler = () => {
		setReply(true)
	}

	const nameHandler = (e) => {
		console.log(e.target.value, 'name')
		setName(e.target.value)
	}

	const passwordHandler = (e) => {
		console.log(e.target.value, 'password')
		setPassword(e.target.value)
	}

	const commentPost = async () => {
		console.log(router.query, 'query')
		const response = await axios.post('/api/comment', {
			postId: router.query,
			writer: name,
			password: password,
			content: comment,
			depth: depth,
		})
		console.log(response, 'response check')
		if (response.status === 200) {
			alert('댓글이 정상적으로 등록되었습니다.')
		}
	}

	return (
		<Container>
			<h3 style={{marginBottom: 5}}>Comments</h3>
			<Divider />
			<List className={classes.root}>
				<ListItem style={{paddingBottom: 0}}>
					<ListItemAvatar>
						<AccountBoxIcon fontSize="large" className={classes.inline} />
					</ListItemAvatar>
					<ListItemText primary="How artistic!" secondary="by Matt, Today at 5:42" />
				</ListItem>
				<Button className={classes.button} varaint="text" onClick={depthHandelr}>reply</Button>
			</List>
			<List className={classes.root}>
				<ListItem style={{paddingBottom: 0}}>
					<ListItemAvatar>
						<AccountBoxIcon fontSize="large" className={classes.inline} />
					</ListItemAvatar>
					<ListItemText primary="How artistic!" secondary="by Matt, Yesterday" />
				</ListItem>
				<Button className={classes.button} varaint="text">reply</Button>
			</List>
			<Divider />
			<div style={{paddingBottom: '50px', paddingTop: '10px'}}>
				<div style={{paddingBottom: 10}}>
				<TextField
					label="enter your name"
					// variant="outlined"
					onChange={nameHandler}
					style={{paddingRight: 10}}
				/>
				<TextField
					label="enter your password"
					// variant="outlined"
					onChange={passwordHandler}
				/>
			</div>
				<TextField 
					label="enter your comment"
					variant="outlined"
					// onClick={openHandler}
					onChange={commentHandler}
					fullWidth
					multiline
					rows={6}
					style={{paddingBottom: '10px', color: "#218e16"}}
				/>
				{/* <Modal
					open={open}
					onClose={closeHandler}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					{body}
      	</Modal> */}
				<Button
					variant="contained"
					color="primary"
					startIcon={<SendIcon />}
					onClick={commentPost}
				>
					Save
				</Button>
			</div>
		</Container>
	)
}

export default container
