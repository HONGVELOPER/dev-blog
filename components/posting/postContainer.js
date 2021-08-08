import React, { useEffect, useRef, useState } from 'react';
import S3 from 'react-aws-s3';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import router from 'next/router';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	editor: {
		height: '500px',
		marginTop: '10px',
	}
}))

export const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'formula'],
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

  useEffect(() => {
    if (quillElement.current) {
      quillInstance.current = new Quill(quillElement.current, {
        theme: 'snow',
        placeholder: 'Please enter the contents.',
        modules: modules,
        onchange
      });
    }

    const quill = quillInstance.current;
    const toolbar = quill.getModule('toolbar')
    toolbar.addHandler('image', onClickImageBtn)
  }, []);
	
	const titleHandler = (event) => {
		setTitle(event.currentTarget.value)
	}

  const onClickImageBtn = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async function () {
      console.log('on change')
      const file = input.files[0]

      const formData = new FormData()
      formData.append('img', file)

      const image = await axios.post('/api/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // const range = quillInstance.current.getSelection(true)
      // quillInstance.current.insertEmbed(
      //   range.index,
      //   'image',
      //   'https://dev-hong-bucket.s3.ap-northeast-2.amazonaws.com/2020-07-10.png'
      // );
      // quillInstance.current.insertEmbed(
      //   range.index,
      //   'image',
      //   'https://dev-hong-bucket.s3.ap-northeast-2.amazonaws.com/2020-09-10+(3).png'
      // );
      // image.push('https://dev-hong-bucket.s3.ap-northeast-2.amazonaws.com/2020-07-10.png')
      // console.log(image, 'image')
      // quillInstance.current.setSelection(range.index + 1)
      if (image.status === 200) {
        const range = quillInstance.current.getSelection(true)
        quillInstance.current.insertEmbed(
          range.index,
          'image',
          `${image.data.location}`
        );
        image.push(`${image.data.location}`)
        console.log(image, 'image')
        quillInstance.current.setSelection(range.index + 1)
      } else {
        alert('error')
      }
    }
  }

  const blogPost = async (event) => {
		event.preventDefault()

    const imageSet = new Set()
    const imgReg = /(<img[^>]*src\s*=\s*[\"']?([^>\"']+)[\"']?[^>]*>)/g
    while (imgReg.test(quillInstance.current.root.innerHTML)) {
      imageSet.add(RegExp.$2.trim())
    }
    console.log(imageSet, 'imgSet check')
    const imageArray = Array.from(imageSet)
		const response = await axios.post('/api/blog', {
			title: title,
			content: quillInstance.current.root.innerHTML,
			writer: 'dev hong',
			img: image,
      imgSet: imageArray,
		})
		console.log(response, 'RESPONSE CHECK')
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
					<TextField
						placeholder="제목을 입력해주세요. "
						helperText="필수 입력 사항입니다."
						fullWidth
						margin="normal"
						onChange={titleHandler}
					/>
					<div ref={quillElement} className={classes.editor} />
					<div style={{display: 'flex', paddingTop: '50px'}}>
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