import blogFuncitons from './blogFunction'

const BlogHandler = async (req, res) => {
	console.log(req.method, 'req method check')
	if (req.method === 'POST') {
		try {
			// 비밀번호 확인
			if (req.body.password) {
				const result = await blogFuncitons.passwordCheck(req.body)
				return res.status(200).send({result})
			}
			// 블로그 글 포스팅
			const result = await blogFuncitons.blogPost(req.body)
			if (result) {	
				return res.status(200).send({})
			}
		} catch (error) {
			return res.status(500).json({ message: error.message })
		}
	} else if (req.method === 'get') {
		console.log('get method start')
		try {
			// 게시물 1개 가져올 때
			if (Object.keys(req.query).length !== 0) { 
				console.log('here? ')
				const result = await blogFuncitons.getOnePost(req.query.id)
				return res.status(200).json(result)
			// 게시물 전체를 가져올 때
			} else { 
				const result = await blogFuncitons.getAllPost()
				return res.status(200).json(result)
			}
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: error.message })
		}
	} else if (req.method === 'PUT') {
		try {
			const result = await blogFuncitons.updatePost(req.body)
			if (result) {
				return res.status(200).send({})
			}
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: error.message })
		}
	} else if (req.method === 'DELETE') {
		try {
			const result = await blogFuncitons.deletePost(req.query.id)
			if (result) {
				return res.status(200).send({})
			}
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: error.message })
		}
	}
}

export default BlogHandler