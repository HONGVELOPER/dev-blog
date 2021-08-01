import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import dynamic from 'next/dynamic';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import router, { useRouter } from 'next/router';

// import { ImageResize } from 'quill-image-resize-module';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false, loading: () => <p>Loading ...</p> });
const {Quill} = ReactQuill
// const ImageResize = dynamic(() => import('quill-image-resize-module'), { ssr: false, loading: () => <p>Loading ...</p> });
// Quill.register('modules/imageResize', ImageResize);


const modules = {
  toolbar: [
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


const useStyles = makeStyles((theme) => ({
	editor: {
		height: '500px',
		marginTop: '10px',
	}
}))

const UpadateContainer = (props) => {
	// console.log(props.data)

	const [title, setTitle] = useState('')
	const [content, setContent] = useState(props.data.content)
	const [writer, setwriter] = useState('')

    useEffect(() => {
        setTitle(props.data.title)
        console.log(title, 'title check')
    })

	const handleTitle = (event) => {
		setTitle(event.currentTarget.value)
        console.log(event.currentTarget.value)
	}
	
	const handleContent = (content) => {
		setContent(content)
	}
	
	const blogPost = async (event) => {
		event.preventDefault()
		const response = await axios.put('/api/blog', {
            id: props.data.id,
			title: title,
			content: content,
			writer: 'dev hong',
		})
		console.log(response, 'RESPONSE CHECK')
		if (response.status === 200) {
			alert('블로그 포스팅이 정상적으로 수정되었습니다.')
			router.push(`/blog/${props.data.id}`)
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
					onChange={handleTitle}
                    defaultValue={props.data.title}
				/>
				<ReactQuill
					className={classes.editor}
					modules={modules}
					formats={formats}
					theme="snow"
					value={content}
					onChange={handleContent}
				/>
				<div style={{display: 'flex', paddingTop: '50px'}}>
					<Button variant="outlined" href="./" style={{color: '#218e16', backgroundColor: 'white'}}>
						Back
					</Button>
					<Button
						variant="outlined"
						// color="transparent"
						endIcon={<SaveIcon />}
						onClick={blogPost}
						style={{marginLeft: 'auto', color: '#218e16', backgroundColor: 'white'}}
					>
						Save
					</Button>
				</div>
			</form>
		</Container>
	)
}

export default UpadateContainer