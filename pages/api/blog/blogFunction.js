import { sql_query } from '../../../lib/db'

const blogFunctions = {}

// 블로그 글 포스팅
blogFunctions.blogPost = async function (postData) {
	let success =  false
	try {
		await sql_query(`
			insert into dev_blog.post (P_TITLE, P_CONTENT, P_WRITER)
			VALUE ('${postData.title}', '${postData.content}', '${postData.writer}');
		`)
		success = true
	} catch (error) {
		success = false
		console.log(error)
	}
	return success
}

// 블로그 글 전체 가져오기
blogFunctions.getPost = async function () {
	try {
		const response = []
		const results = await sql_query(`
			select * from dev_blog.post
		`)
		for (const result of results) {
			const final = {
				id : result.P_ID,
				title: result.P_TITLE,
				content: result.P_CONTENT.replace(/(<([^>]+)>)/ig,""),
				writer: result.P_WRITER,
				date: result.P_DATE,
			}
			response.push(final)
		}
		return response
	} catch (error) {
		console.log(error)
	}
}

// 블로그 상세 페이지 위한 글 가져오기
blogFunctions.getOnePost = async function (id) {
	try {
		const view = await sql_query(`
			update dev_blog.post set P_VIEW = P_VIEW + 1 where P_ID = ${id}
		`)
		const result = await sql_query(`
			select * from dev_blog.post where P_ID = ${id}
		`)
		const response = [{
			id: result[0].P_ID,
			title: result[0].P_TITLE,
			content: result[0].P_CONTENT,
			view: result[0].P_VIEW,
			writer: result[0].P_WRITER,
			date: result[0].P_MOD_DT,
		}]
		return response
	} catch (error) {
		console.log(error)
	}
}

export default blogFunctions