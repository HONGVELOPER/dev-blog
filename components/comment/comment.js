import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SendIcon from '@material-ui/icons/Send';
// import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		paddingTop: 0
	},
	inline: {
		display: 'inline'
	},
	button: {
		marginLeft: '64px',
	}
}))

const commentContainer = (props) => {
	// console.log(props, 'props~~~~~~~~~~~~~~')
	// console.log(props.data[0], '0')
	const router = useRouter()
	const classes = useStyles()
	const [content, setContent] = useState('')
	const [depth, setDepth] = useState(0)
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const contentHandler = (e) => {
		console.log(e.target.value, 'event')
		setContent(e.target.value)
	}

	const depthHandelr = () => {
		console.log(depth)
		setDepth(depth + 1)
	}

	const nameHandler = (e) => {
		console.log(e.target.value, 'name')
		setName(e.target.value)
	}

	const passwordHandler = (e) => {
		console.log(e.target.value, 'password')
		setPassword(e.target.value)
	}

	let commentList = null 
	if (props.data) {
		commentList = props.data.map((comment) => (
			<List className={classes.root} key={comment.id}>
				<ListItem style={{paddingBottom: 0}}>
					<ListItemAvatar>
						<AccountBoxIcon fontSize="large" className={classes.inline} />
					</ListItemAvatar>
					<ListItemText
						primary={
							<Typography>
								<span style={{fontWeight: 800, fontSize: 14}}>
									{comment.writer}
								</span>
								<span style={{color: '#808080', fontSize: 14}}>
									&nbsp;&nbsp;{comment.date}
								</span>
							</Typography>
						}
						secondary={
							<Typography style={{fontWeight: 200, whiteSpace: 'pre'}}>
								{/* <pre> */}
								{comment.content}
								{/* </pre> */}
							</Typography>}
					/>
				</ListItem>
				<Button className={classes.button} varaint="text" onClick={depthHandelr}>reply</Button>
			</List>
		))
	}

	const commentPost = async () => {
		console.log(router.query, 'query')
		const response = await axios.post('/api/comment', {
			postId: router.query,
			writer: name,
			password: password,
			content: content,
			depth: depth,
		})
		console.log(response, 'response check')
		if (response.status === 200) {
			alert('댓글이 정상적으로 등록되었습니다.')
			// router.push(`/blog/${props.data[0].post_id}`)
		} else {
			alert('COMMENT POST FAIL ERROR')
		}
	}

	return (
		<Container>
			<h3 style={{marginBottom: 5}}>Comments</h3>
			<Divider />
			{commentList}
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
					onChange={contentHandler}
					fullWidth
					multiline
					rows={6}
					style={{paddingBottom: '10px', color: "#218e16"}}
				/>
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

export default commentContainer
