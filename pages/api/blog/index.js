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
			if (Object.keys(req.query).length !== 0) {
				const result = await blogFuncitons.getOnePost(req.query.id)
				res.stausCode = 200
				
				return res.json(result)
			} else {
				const results = await blogFuncitons.getPost()
				// console.log(results)
				res.statusCode = 200
				return res.json(results)
			}
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: e.message })
		}
	}
}

export default BlogHandler;