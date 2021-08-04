import { sql_query } from '../../../lib/db'

const blogFunctions = {}

// 블로그 글 포스팅
blogFunctions.blogPost = async function (postData) {
	console.log(postData, 'post data ')
	let success =  false
	try {
		const result = await sql_query(`
			insert into dev_blog.post (P_TITLE, P_CONTENT, P_WRITER)
			VALUE ('${postData.title}', '${postData.content}', '${postData.writer}');
		`)
		console.log(result, 'result')

		for (const img of postData.img) {
			await sql_query(`
				insert into dev_blog.file (F_POST_ID, F_IMG)
				VALUE (${result.insertId}, '${img}');
			`)
		}
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
			select * from dev_blog.post order by P_ID desc
		`)
		const images = await sql_query(`
			select * from dev_blog.file where F_ID in (select min(F_ID) from dev_blog.file group by F_POST_ID) order by F_ID desc
		`)
		for (const result of results) {
			console.log(results.indexOf(result))
			const final = {
				id : result.P_ID,
				title: result.P_TITLE,
				content: result.P_CONTENT.replace(/(<([^>]+)>)/ig,"").substring(0, 90) + ' ···',
				view: result.P_VIEW,
				writer: result.P_WRITER,
				date: result.P_MOD_DT.split(' ')[0],
				img: images[results.indexOf(result)].F_IMG
			}
			// 글 마다 1개의 사진을 가져오는 로직인데 블로그 전체를 가져오는 화면으로 자원이 소모가 많아
			// img를 아래와 같이가 아니라 위처럼 index로 접근하여 Front로 보내주기로 결정.
			// for (const img of images) {
			// 	if (img.F_POST_ID === result.P_ID) {
			// 		final.img = img.F_IMG
			// 	}
			// }
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
		await sql_query(`
			update dev_blog.post set P_VIEW = P_VIEW + 1 where P_ID = ${id}
		`)
		const result = await sql_query(`
			select * from dev_blog.post where P_ID = ${id}
		`)
		const img = await sql_query(`
			select F_IMG from dev_blog.file where F_POST_ID = ${id}
		`)
		const response = [{
			id: result[0].P_ID,
			title: result[0].P_TITLE,
			content: result[0].P_CONTENT,
			view: result[0].P_VIEW,
			writer: result[0].P_WRITER,
			date: result[0].P_MOD_DT,
		}]
		if (img.length) {
			response[0].img = img[0].F_IMG
		}
		return response
	} catch (error) {
		console.log(error)
	}
}

// 블로그 상세 페이지 업데이트
blogFunctions.updatePost = async function (data) {
	let success = null
	try {
		const result = await sql_query(`
			update dev_blog.post set P_TITLE = '${data.title}', P_CONTENT = '${data.content}', P_WRITER = '${data.writer}' where P_ID = ${data.id}
		`)
		console.log(result, 'result')
		success = true
	} catch (error) {
		success = false
		console.log(error)
	}
	return success
}

blogFunctions.deletePost = async function(id) {
	let success = null
	try {
		const result = await sql_query(`
			delete from dev_blog.post where P_ID = ${id}
		`)
		// const length = await sql_query(`
		// 	SELECT COUNT(P_ID) FROM dev_blog.post   
		// `)
		// console.log('length :', length)
		// const idArrange = await sql_query(`
		// 	SET @CNT = 0
		// 	UPDATE dev_blog.post SET dev_blog.post.P_ID = @CNT:=@CNT+1
		// 	ALTER TABLE dev_blog.post AUTO_INCREMENT=1
		// `)
		success = true
	} catch (error) {
		success = false
		console.log(error)
	}
	return success
}


export default blogFunctions