import blogFunctions from './blogFunction'
import blogFuncitons from './blogFunction'

const BlogHandler = async (req, res) => {
	console.log(req.method, 'method check')
	if (req.method === 'POST') {
		try {
			const result = await blogFuncitons.blogPost(req.body)
			console.log(result, 'check')
			if (result) {
				return res.status(200).send({})
			}
		} catch (error) {
			return res.status(500).json({ message: error.message })
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
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: error.message })
		}
	} else if (req.method === 'PUT') {
		try {
			const result = await blogFunctions.updatePost(req.body)
			if (result) {
				console.log('진입')
				return res.status(200).send({})
			}
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: error.message })
		}
	} else if (req.method === 'DELETE') {
		try {
			const result = await blogFunctions.deletePost(req.query.id)
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