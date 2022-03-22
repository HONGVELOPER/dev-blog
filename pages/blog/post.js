import React, { useState, useEffect } from "react";
import Header from "../../components/index/Header.js";
import PostContainer from "../../components/posting/postContainer.js";
import Modal from "../../components/posting/modal.js";

function BlogPost() {
	const [show, setShow] = useState(false);

	function showHandler(showResult) {
		setShow(showResult);
	}

	useEffect(() => {
		document.querySelector(".modalButton").click();
	}, []);

	return (
		<div>
			{show ? (
				<>
					<Header />
					<PostContainer />
				</>
			) : (
				<>
					<Modal passwordCheck={showHandler} />
				</>
			)}
		</div>
	);
}

export default BlogPost;
