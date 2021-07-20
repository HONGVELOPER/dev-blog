import { sql_query } from '../../../lib/db'

const BlogHandler = async (req, res) => {
	console.log(req.method, 'method check')
	console.log('req~!!!')
	if (req.method === 'POST') {
		console.log('진입')
		try {
			await sql_query(`
				insert into dev_blog.posting (P_ID, P_TITLE, P_CONTENT, P_WRITER, P_DATE)
				VALUE (4, '${req.body.title}', 'content', 'me', '3');
			`)
			return res.statusCode = 200
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: e.message })
		}
	} else if (req.method === 'GET') {
		console.log('\n\n\nGET METHOD~\n\n\n')
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