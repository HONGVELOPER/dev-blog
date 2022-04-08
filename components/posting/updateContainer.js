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

const image = [];
const imageCopy = [];
const uploadImage = [];

const UpadateContainer = (props) => {
	const classes = useStyles();

	const Quill = typeof window == "object" ? require("quill") : () => false;
	const quillElement = useRef(null);
	const quillInstance = useRef(null);

	const [title, setTitle] = useState("");
	const [quillFile, setQuillFile] = useState([]);

	useEffect(() => {
		setTitle(props.data.title);
		if (props.data.img) {
			for (const i of props.data.img) {
				image.push(i.F_IMG);
				imageCopy.push(i.F_IMG);
			}
		}
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
		quill.root.innerHTML = props.data.content;
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

	const blogPost = async (event) => {
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
		const deleteFile = props.data.img.filter(
			(item) => !quillImgTagArr.includes(item.F_IMG)
		);
		let finalContent = quillInstance.current.root.innerHTML;
		let s3File = [];
		if (updateFile.length) {
			const formData = new FormData();
			for (const img of updateFile) {
				formData.append("img", img.file);
			}
			const s3Response = await axios.post(
				"/api/image/uploadFile",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			s3File = s3Response.data.location;
			for (const i of updateFile) {
				for (const j of s3File) {
					if (i.file.name === j.split("/")[3]) {
						finalContent = finalContent.replace(i.base64, j);
					}
				}
			}
		}
		const response = await axios.put("/api/blog/post", {
			id: props.data.id,
			title: title,
			content: finalContent,
			writer: "HongJin",
			uploadImg: s3File,
			deleteImg: deleteFile,
		});
		if (response.status === 200) {
			alert("블로그 포스팅이 정상적으로 수정되었습니다.");
			router.push(`/blog/${props.data.id}`);
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
						defaultValue={props.data.title}
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
