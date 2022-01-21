import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import router from 'next/router';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	editor: {
		height: '67vh',
		marginTop: '10px',
	},
	thHover: {
		transition: '0.5s',
		"&:hover": {
		color: '#218e16',
		backgroundColor: "#FFF",
		},
	},
}))

export const modules = {
	toolbar: {
		container: [
		[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
		[{ 'font': [] }],

		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],

		[{ 'list': 'ordered' }, { 'list': 'bullet' }],,
		[{ 'indent': '-1' }, { 'indent': '+1' }],

		[{ 'color': [] }, { 'background': [] }],
		[{ 'align': [] }],
		['link', 'image'],
		['clean'],
		],
	},
};

const image = []
const postContainer = () => {
	const classes = useStyles()
  
  	const Quill = typeof window == 'object' ? require('quill') : () => false

	const quillElement = useRef(null)
	const quillInstance = useRef(null)

	const [title, setTitle] = useState("")
	const [underLine, setUnderline] = useState(false)
	const [currentFile, setCurrentFile] = useState(null);
	const [previewImg, setPreviewImg] = useState(null);

	useEffect(() => {
		if (quillElement.current) {
		quillInstance.current = new Quill(quillElement.current, {
			theme: 'snow',
			placeholder: 'Please enter the contents.',
			modules: modules,
		});
		}

		const quill = quillInstance.current;
		const toolbar = quill.getModule('toolbar')
		toolbar.addHandler('image', onClickImageBtn)
		toolbar.addHandler('underline', onClickUnderLine)
	}, []);

  

	const chooseImg = () => {
		document.getElementById("btn-upload").click()
	}

	const selectFile = async (event) => {
		setCurrentFile(event.target.files[0])
		setPreviewImg(URL.createObjectURL(event.target.files[0]))
	}

	const thumbNailHandler = async () => {
		const formData = new FormData()
		formData.append('img', currentFile)

		const result = await axios.post('/api/image/uploadFile', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		if (result.status === 200) {
			return result.data.location
		}
	}

	const onClickUnderLine = () => {
		const position = quillInstance.current.getSelection(true) // position of dragged string
		const ulText = quillInstance.current.getText(position.index, position.length) // get text of position
		quillInstance.current.deleteText(position.index, position.length) // origin text delete
		quillInstance.current.insertText(position.index, ulText, {'underline': true})
	}
	
	const titleHandler = (event) => {
		setTitle(event.currentTarget.value)
	}

	const onClickImageBtn = () => {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', 'image/*')
		input.click()
		input.onchange = async function () {
			const file = input.files[0]
			const formData = new FormData()
			formData.append('img', file)

			const result = await axios.post('/api/image/uploadFile', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			console.log(result, 'imgBtn click')
			if (result.status === 200) {
				const range = quillInstance.current.getSelection(true)
				quillInstance.current.insertEmbed(
				range.index,
				'image',
				`${result.data.location}`
				);
				image.push(`${result.data.location}`)
				quillInstance.current.setSelection(range.index + 1)
			} else {
				alert('error')
			}
		}
	}

	const blogPost = async (event) => {
		event.preventDefault()
		let ulCount = 0
		const ulList = document.getElementsByTagName('u')
		for (const ulData of ulList) {
			ulData.setAttribute('class', `ul-${ulCount}`)
			ulCount++
		}

		const imageSet = new Set()
		const imgReg = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g
		while (imgReg.test(quillInstance.current.root.innerHTML)) {
			imageSet.add(RegExp.$2.trim())
		}
		const imageArray = Array.from(imageSet)
		const uploadFile = image.filter(x => imageArray.includes(x))

		const thumbNail = await thumbNailHandler()

		const response = await axios.post('/api/blog', {
			title: title,
			content: quillInstance.current.root.innerHTML,
			writer: 'dev hong',
			thumbNail: thumbNail,
			img: uploadFile,
		})
    
		const deleteFile = image.filter(x => !imageArray.includes(x))
		if (deleteFile.length) {
			console.log("front delete file 진입")
			await axios.put('/api/image/deleteFile', {
				deleteFiles: deleteFile,
			})
		}
		if (response.status === 200) {
			alert('블로그 포스팅이 정상적으로 작동되었습니다.')
			router.push('/blog')
		} else {
			alert('BLOG POST FAIL ERROR')
		}
	}

  	return (
    	<>
			<Container className={classes.root}>
				<form>
					<Grid container>
						<Grid item xs={12}>
							<div>
								<div style={{marginBottom: '10px', marginTop: '10px'}}>
									<input
										id="btn-upload" 
										name="btn-upload"
										type="file"
										accept="image/*"
										style={{display: 'none'}}
										onChange={selectFile}
									/>
									<Button variant="outlined" onClick={chooseImg} component="span" className={classes.thHover}>
										Choose ThumbNail Image
									</Button>
									<span style={{marginLeft: '20px'}}>
										{currentFile ? currentFile.name : null}
									</span>
								</div>
								<span>
									{previewImg ? <img src={previewImg} alt=""  height={200} width={300} style={{display: 'inline-block'}} /> : null}
								</span>
							</div>
						</Grid>
					</Grid>
					<TextField
						placeholder="제목을 입력해주세요. "
						helperText="필수 입력 사항입니다."
						fullWidth
						margin="normal"
						onChange={titleHandler}
					/>
					<div ref={quillElement} className={classes.editor} />
					<div style={{display: 'flex', paddingTop: '20px'}}>
						<Button variant="outlined" href="./" style={{color: '#218e16', backgroundColor: 'white'}}>
							Back
						</Button>
						<Button
							variant="outlined"
							endIcon={<SaveIcon />}
							onClick={blogPost}
							style={{marginLeft: 'auto', color: '#218e16', backgroundColor: 'white'}}
							>
							Submit
						</Button>
					</div>
				</form>
			</Container>
   		 </>
  	);
}

export default postContainer