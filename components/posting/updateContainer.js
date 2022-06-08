import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import router from "next/router";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	editor: {
		height: "67vh",
		marginTop: "10px",
	},
}));

export const modules = {
	toolbar: {
		container: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: [] }],
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ indent: "-1" }, { indent: "+1" }],
			[{ color: [] }, { background: [] }],
			[{ align: [] }],
			["link", "image"],
			["clean"],
		],
	},
};

const UpadateContainer = (props) => {
	const classes = useStyles();

	const Quill = typeof window == "object" ? require("quill") : () => false;
	const quillElement = useRef(null);
	const quillInstance = useRef(null);

	const [title, setTitle] = useState("");
	const [quillFile, setQuillFile] = useState([]);

	useEffect(() => {
		setTitle(props.post.data.title);
		if (quillElement.current) {
			quillInstance.current = new Quill(quillElement.current, {
				theme: "snow",
				placeholder: "Please enter the contents.",
				modules: modules,
			});
		}
		const quill = quillInstance.current;
		const toolbar = quill.getModule("toolbar");
		toolbar.addHandler("image", onClickImageBtn);
		quill.root.innerHTML = props.post.data.content;
	}, []);

	const onClickImageBtn = () => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();
		input.onchange = async (event) => {
			const file = event.target.files[0];
			const fileReader = new FileReader();
			fileReader.onload = function (event) {
				const base64Img = event.target.result;
				const range = quillInstance.current.getSelection().index;
				quillInstance.current.insertEmbed(range, "image", base64Img);
				quillInstance.current.setSelection(range + 1);
				setQuillFile((prev) => [
					...prev,
					{ base64: base64Img, file: file },
				]);
			};
			fileReader.readAsDataURL(file);
		};
	};

	const titleHandler = (event) => {
		setTitle(event.currentTarget.value);
	};

	const imageHandler = async (images) => {
		const formData = new FormData();
		for (const image of images) {
			formData.append("multipartFileList", image.file);
		}
		const result = await axios.post("/api/v1/s3/images", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		if (result.data.success) {
			return result.data.list;
		}
	};

	const blogPost = async (event) => {
		if (!title) {
			return alert("제목을 작성해주세요.");
		}
		event.preventDefault();
		const result = Array.from(
			quillInstance.current.root.innerHTML.matchAll(
				/<img[^>]+src=["']([^'">]+)['"]/gi
			)
		);
		const quillImgTagArr = result.map((item) => item.pop() || "");
		const updateFile = quillFile.filter((item) =>
			quillImgTagArr.includes(item.base64)
		);
		if (updateFile.length !== quillFile.length) {
			setQuillFile(updateFile);
		}
		let deleteFile = [];
		if (props.post.data.imageResponseDtoList) {
			deleteFile = props.post.data.imageResponseDtoList.filter(
				(item) => !quillImgTagArr.includes(item.image)
			);
		}
		let finalDeleteFile = [];
		for (const i of deleteFile) {
			finalDeleteFile.push(i.image.split(".com/")[1]);
		}
		let s3File = [];
		let finalContent = quillInstance.current.root.innerHTML;
		if (updateFile.length) {
			const s3Response = await imageHandler(updateFile);
			for (const i of updateFile) {
				for (const j of s3Response) {
					if (i.file.name === j[0]) {
						finalContent = finalContent.replace(i.base64, j[1]);
					}
					s3File.push(j[1]);
				}
			}
		}
		const response = await axios.put(`/api/v1/post/${props.post.data.id}`, {
			title: title,
			content: finalContent,
			author: "HongJin",
			viewCount: 0,
			thumbNail: props.post.data.thumbNail,
			images: s3File,
			deleteImages: finalDeleteFile,
		});
		if (response.data.success) {
			alert("블로그 포스팅이 정상적으로 수정되었습니다.");
			router.push(`/blog/${props.post.data.id}`);
		} else {
			alert("블로그 수정에 실패하였습니다. 다시 시도해주세요.");
		}
	};

	return (
		<>
			<Container style={{ maxWidth: "1100px" }}>
				<form>
					<TextField
						placeholder="제목을 입력해주세요. "
						helperText="필수 입력 사항입니다."
						fullWidth
						margin="normal"
						onChange={titleHandler}
						defaultValue={props.post.data.title}
					/>
					<div ref={quillElement} className={classes.editor}></div>
					<div style={{ display: "flex", paddingTop: "20px" }}>
						<Button
							variant="outlined"
							href="./"
							style={{
								color: "#218e16",
								backgroundColor: "white",
							}}
						>
							Back
						</Button>
						<Button
							variant="outlined"
							endIcon={<SaveIcon />}
							onClick={blogPost}
							style={{
								marginLeft: "auto",
								color: "#218e16",
								backgroundColor: "white",
							}}
						>
							Save
						</Button>
					</div>
				</form>
			</Container>
		</>
	);
};

export default UpadateContainer;
