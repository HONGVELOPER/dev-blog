import { sql_query } from '../../../lib/db'
// import axios from 'axios'

const blogFunctions = {}


// 블로그 글 포스팅
blogFunctions.blogPost = async function (postData) {
	let success =  false
	try {
		await sql_query(`
			insert into dev_blog.posting (P_TITLE, P_CONTENT, P_WRITER, P_DATE)
			VALUE ('${postData.title}', '${postData.content}', '${postData.writer}', '3');
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
		const result = await sql_query(`
			select * from dev_blog.posting
		`)
		return result
	} catch (error) {
		console.log(error)
	}
}

// 블로그 상세 페이지 위한 글 가져오기
blogFunctions.getOnePost = async function (id) {
	try {
		const result = await sql_query(`
			select * from dev_blog.posting where P_ID = ${id}
		`)
		return result
	} catch (error) {
		console.log(error)
	}
}

export default blogFunctions