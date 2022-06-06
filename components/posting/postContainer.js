import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
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
	thHover: {
		transition: "0.5s",
		"&:hover": {
			color: "#218e16",
			backgroundColor: "#FFF",
		},
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

const postContainer = () => {
	const classes = useStyles();

	const Quill = typeof window == "object" ? require("quill") : () => false;
	const quillElement = useRef(null);
	const quillInstance = useRef(null);

	const [title, setTitle] = useState("");
	const [currentFile, setCurrentFile] = useState();
	const [previewImg, setPreviewImg] = useState(null);
	const [quillFile, setQuillFile] = useState([]);

	useEffect(() => {
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
	}, []);

	// 썸네일 선택 버튼 클릭시 input tag 클릭하도록
	const chooseImg = () => {
		document.getElementById("btn-upload").click();
	};
	//  썸네일 이미지 미리보기 생성
	const selectFile = async (event) => {
		setCurrentFile(event.target.files[0]);
		setPreviewImg(URL.createObjectURL(event.target.files[0]));
	};

	// 제목 저장
	const titleHandler = (event) => {
		setTitle(event.currentTarget.value);
	};

	// 이미지 버튼 클릭시 미리보기(base64), file 따로 저장
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

	// 이미지 저장
	const imageHandler = async (images) => {
		const formData = new FormData();
		if (Array.isArray(images)) {
			for (const image of images) {
				formData.append("multipartFileList", image.file);
			}
		} else {
			formData.append("multipartFileList", images);
		}
		const result = await axios.post("/api/v1/s3/images", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		if (result.data.success) {
			if (Array.isArray(images)) {
				return result.data.list;
			} else {
				return result.data.list[0][1];
			}
		}
	};

	// 포스팅
	const blogPost = async (event) => {
		event.preventDefault();
		const result = Array.from(
			quillInstance.current.root.innerHTML.matchAll(
				/<img[^>]+src=["']([^'">]+)['"]/gi
			)
		);
		const quillImgTagArr = result.map((item) => item.pop() || "");
		const filterFile = quillFile.filter(
			(item) => quillImgTagArr.includes(item.base64) && item
		);
		if (filterFile.length !== quillFile.length) {
			setQuillFile(filterFile);
		}
		let s3File = [];
		let finalContent = quillInstance.current.root.innerHTML;
		if (filterFile.length) {
			const s3Response = await imageHandler(filterFile);
			for (const i of filterFile) {
				for (const j of s3Response) {
					if (i.file.name === j[0]) {
						finalContent = finalContent.replace(i.base64, j[1]);
					}
					s3File.push(j[1]);
				}
			}
		}
		const thumbNail = await imageHandler(currentFile);
		const response = await axios.post("/api/v1/post", {
			title: title,
			content: finalContent,
			author: "HongJin",
			viewCount: 0,
			thumbNail: thumbNail,
			images: s3File,
			deleteImages: [],
		});
		if (response.data.success) {
			alert("블로그 포스팅이 정상적으로 작성되었습니다.");
			router.push("/blog");
		} else {
			alert("블로그 포스팅에 실패하였습니다. 다시 시도해주세요.");
		}
	};

	return (
		<>
			<Container style={{ maxWidth: "1100px" }}>
				<form>
					<Grid container>
						<Grid item xs={12}>
							<div>
								<div
									style={{
										marginBottom: "10px",
										marginTop: "10px",
									}}
								>
									<input
										id="btn-upload"
										name="btn-upload"
										type="file"
										accept="image/*"
										style={{ display: "none" }}
										onChange={selectFile}
									/>
									<Button
										variant="outlined"
										onClick={chooseImg}
										component="span"
										className={classes.thHover}
									>
										Choose ThumbNail Image
									</Button>
									<span style={{ marginLeft: "20px" }}>
										{currentFile ? currentFile.name : null}
									</span>
								</div>
								<span>
									{previewImg ? (
										<img
											src={previewImg}
											alt=""
											height={200}
											width={300}
											style={{ display: "inline-block" }}
										/>
									) : null}
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
								paddingBottom: "10px",
							}}
						>
							Submit
						</Button>
					</div>
				</form>
			</Container>
		</>
	);
};

export default postContainer;
