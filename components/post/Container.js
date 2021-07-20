import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';
import axios from 'axios';



const useStyles = makeStyles((theme) => {
	
})

const PostContainer = () => {
	
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [writer, setwriter] = useState("")

	const postTitle = (event) => {
		// console.log(event.currentTarget, 'event current')
		// console.log(event, 'event detail')
		setTitle(event.currentTarget.value)
	}

	const handlePost = async (event) => {
		event.preventDefault()
		const response = await axios.post('/api/blog', {
			title: title,
			content: content,
			writer: writer,
		})
		console.log(response)
	}

	const classes = useStyles()

	return (
		<Container>
			<div>check</div>
			<form>
				<label>POST CHECK</label>
				<input type="title" value={title} onChange={postTitle} />
				<button onClick={handlePost}>Click me</button>
			</form>
		</Container>
	)
}

export default PostContainer