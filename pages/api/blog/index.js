import blogFuncitons from './blogFunction'

const BlogHandler = async (req, res) => {
	console.log(req.method, 'method check')
	if (req.method === 'POST') {
		try {
			await blogFuncitons.blogPost(req.body)
			return res.status(200).send({})
		} catch (e) {
			return res.status(500).json({ message: e.message })
		}
	} else if (req.method === 'GET') {
		try {
			// 게시물 1개 가져올 때
			if (Object.keys(req.query).length !== 0) { 
				const result = await blogFuncitons.getOnePost(req.query.id)
				return res.status(200).json(result)
			// 게시물 전체를 가져올 때
			} else { 
				const result = await blogFuncitons.getPost()
				return res.status(200).json(result)
			}
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: e.message })
		}
	}
}

export default BlogHandler