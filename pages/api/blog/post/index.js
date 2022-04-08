import blogFunctions from "../blogFunction";

const PostHandler = async (req, res) => {
	if (req.method === "POST") {
		try {
			// 블로그 글 포스팅
			const result = await blogFunctions.blogPost(req.body);
			if (result) {
				return res.status(200).send({});
			}
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	} else if (req.method === "GET") {
		try {
			// 게시물 1개 가져올 때
			if (req.query.id) {
				const result = await blogFunctions.getOnePost(req.query.id);
				if (result) {
					return res.status(200).json(result);
				}
			} else {
				// 게시물 전체를 가져올 때
				const result = await blogFunctions.getAllPost();
				if (result) {
					return res.status(200).json(result);
				}
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error.message });
		}
	}
	if (req.method === "PUT") {
		try {
			const result = await blogFunctions.updatePost(req.body);
			if (result) {
				return res.status(200).send({});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error.message });
		}
	} else if (req.method === "DELETE") {
		try {
			const result = await blogFunctions.deletePost(req.query.id);
			if (result) {
				return res.status(200).send({});
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: error.message });
		}
	}
};

export default PostHandler;
