import { sql_query } from '../../../lib/db'

export const config = {
	api: {
	  bodyParser: {
		sizeLimit: '1mb',
	  },
	},
}

const BlogHandler = async (req, res) => {
	console.log(req.method, 'method check')
	console.log('req~!!!')
	if (req.method === 'POST') {
		console.log('POST METHOD~')
		try {
			await sql_query(`
				insert into dev_blog.posting (P_TITLE, P_CONTENT, P_WRITER, P_DATE)
				VALUE ('${req.body.title}', '${req.body.content}', '${req.body.writer}', '3');
			`)
			console.log(req.body, 'here')
			return res.status(200).send({})
		} catch (e) {
			console.log('erre?')
			console.log(e)
			return res.status(500).json({ message: e.message })
		}
	} else if (req.method === 'GET') {
		console.log('GET METHOD~')
		try {
			const results = await sql_query(`
				select * from dev_blog.posting
			`)
			res.statusCode = 200
			return res.json(results)
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: e.message })
		}
	}
}

export default BlogHandler;