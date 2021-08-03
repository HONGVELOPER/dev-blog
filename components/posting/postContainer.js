import React, { useEffect, useRef, useState } from 'react';
import S3 from 'react-aws-s3';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import router from 'next/router';

const useStyles = makeStyles((theme) => ({
	editor: {
		height: '500px',
		marginTop: '10px',
	}
}))

export const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link', 'image', 'formula'],
      ['clean'],
    ],
  },
};

function QuillEditor() {
	const classes = useStyles()

	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const [writer, setwriter] = useState("")
	const [image, setIamge] = useState([])
	
	const titleHandler = (event) => {
		setTitle(event.currentTarget.value)
	}

	const contentHandler = (content) => {

		setContent(content)
		console.log(content)
	}

	const postBlog = async (event) => {
		event.preventDefault()
		const response = await axios.post('/api/blog', {
			title: title,
			content: content,
			writer: 'dev hong',
			img: image
		})
		console.log(response, 'RESPONSE CHECK')
		if (response.status === 200) {
			alert('블로그 포스팅이 정상적으로 작동되었습니다.')
			router.push('/blog')
		} else {
			alert('ERROR')
		}
	}
  
  const Quill = typeof window == 'object' ? require('quill') : () => false

  const quillElement = useRef(null)
  const quillInstance = useRef(null)

  const onClickImageBtn = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = function () {
      const file = input.files[0]
      const fileName = file.name

      const config = {
        bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        region: process.env.NEXT_PUBLIC_S3_REGION,
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
      }

      const ReactS3Client = new S3(config);

      ReactS3Client.uploadFile(file, fileName).then((data) => {
				console.log(data)
        if (data.status === 204) {
					setIamge([...image, data.location])
					console.log(image)
          //커서 위치 받아오기 위함.
          const range = quillInstance.current.getSelection(true)
          // 1.현재 커서 위치에 2. 이미지를 3.src="" 로 나타냄.
          quillInstance.current.insertEmbed(
            range.index,
            'image',
            `${data.location}`
          );

          // 이미지 업로드 후 커서 이미지 한칸 옆으로 이동.
          quillInstance.current.setSelection(range.index + 1)
        } else {
          alert('error')
        }
      });
    };
  };

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
  }, []);

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
					<div ref={quillElement} className={classes.editor} onChange={contentHandler} />
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
    </>
  );
}

export default React.memo(QuillEditor);