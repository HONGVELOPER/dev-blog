import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import dynamic from 'next/dynamic';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import router, { useRouter } from 'next/router';
import S3 from 'react-aws-s3';

// import { ImageResize } from 'quill-image-resize-module';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false, loading: () => <p>Loading ...</p> });
const {Quill} = dynamic(() => import("react-quill"), { ssr: false, loading: () => <p>Loading ...</p> });
// const ImageResize = dynamic(() => import('quill-image-resize-module'), { ssr: false, loading: () => <p>Loading ...</p> });
// Quill.register('modules/imageResize', ImageResize);

const useStyles = makeStyles((theme) => ({
	editor: {
		height: '500px',
		marginTop: '10px',
	}
}))

const PostContainer = () => {
	
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [writer, setwriter] = useState("")

	const titleHandler = (event) => {
		setTitle(event.currentTarget.value)
	}

	
	const contentHandler = (content) => {
		setContent(content)
	}

	const imageHandler = () => {
		console.log('image handler')
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', '.png, .jpg, .jpeg')
		input.click()
		input.onchange = async function() {
			const file = input.files[0]
			console.log('User trying to uplaod this:', file);
			const fileName = file.name

			const config = {
				bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
				region: process.env.NEXT_PUBLIC_S3_REGION,
				accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
				secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
			}

			const ReactS3Client = new S3(config)
			console.log(ReactS3Client, 'check')
			ReactS3Client.uploadFile(file, fileName).then((data) => {
				console.log(data)
			})

			
			
			// const id = await uploadFile(file) // I'm using react, so whatever upload function
			// const range = Quill.getSelection()
			// const link = `${ROOT_URL}/post/${id}`
	
		}
	}

	const modules = {
		toolbar: {
			container: [
				[{ header: '1' }, { header: '2' }],
				[{ size: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
				[
					{ list: 'ordered' },
					{ list: 'bullet' },
					{ indent: '-1' },
					{ indent: '+1' },
				],
				['link', 'image'],
				['clean'],
			],
			handlers: {
				image: imageHandler
			}
		},
		clipboard: {
			matchVisual: false,
		},
	};

	
	
	const formats = [
		'header',
		'font',
		'size',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'video',
		'code',
	];
	
	const postBlog = async (event) => {
		event.preventDefault()
		const response = await axios.post('/api/blog', {
			title: title,
			content: content,
			writer: 'dev hong',
		})
		console.log(response, 'RESPONSE CHECK')
		if (response.status === 200) {
			alert('블로그 포스팅이 정상적으로 작동되었습니다.')
			router.push('/blog')
		} else {
			alert('ERROR')
		}
	}
	const classes = useStyles()

	return (
		<Container className={classes.root}>
			<form>
				<TextField
					placeholder="제목을 입력해주세요. "
					helperText="필수 입력 사항입니다."
					fullWidth
					margin="normal"
					onChange={titleHandler}
				/>
				<ReactQuill
					className={classes.editor}
					modules={modules}
					formats={formats}
					theme="snow"
					value={content}
					onChange={contentHandler}
				/>
				<div style={{display: 'flex', paddingTop: '50px'}}>
					<Button variant="outlined" href="./" style={{color: '#218e16', backgroundColor: 'white'}}>
						Back
					</Button>
					<Button
						variant="outlined"
						endIcon={<SaveIcon />}
						onClick={postBlog}
						style={{marginLeft: 'auto', color: '#218e16', backgroundColor: 'white'}}
						>
						Submit
					</Button>
				</div>
			</form>
		</Container>
	)
}

export default PostContainer