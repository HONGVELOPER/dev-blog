import { sql_query } from '../../../lib/db';
import AWS from 'aws-sdk';

const blogFunctions = {}

// 블로그 글 포스팅하기
blogFunctions.blogPost = async function (postData) {
	// console.log(postData, 'post data ')
	let success =  null
	try {
		const result = await sql_query(`
			insert into dev_blog.post (P_TITLE, P_CONTENT, P_WRITER)
			VALUE ('${postData.title}', '${postData.content}', '${postData.writer}');
		`)
		if (postData.img.length) {
			for (const img of postData.img) {
				await sql_query(`
					insert into dev_blog.file (F_POST_ID, F_IMG) VALUE (${result.insertId}, '${img}');
				`)
			}
		}
		success = true
	} catch (error) {
		success = false
		console.log(error)
	}
	return success
}

// 블로그 글 전체 가져오기
blogFunctions.getAllPost = async function () {
	try {
		const response = []
		const results = await sql_query(`
			select * from dev_blog.post order by P_ID desc
		`)
		const images = await sql_query(`
			select * from dev_blog.file where F_ID in (select min(F_ID) from dev_blog.file group by F_POST_ID) order by F_ID desc
		`)
		for (const result of results) {
			const final = {
				id : result.P_ID,
				title: result.P_TITLE,
				content: result.P_CONTENT.replace(/(<([^>]+)>)/ig,"").substring(0, 90) + ' ···',
				view: result.P_VIEW,
				writer: result.P_WRITER,
				date: result.P_MOD_DT.split(' ')[0],
			}
			if (images.length) {
				for (const img of images) {
					if (img.F_POST_ID === result.P_ID) {
						final.img = img.F_IMG
					}
				}
			}
			response.push(final)
		}
		return response
	} catch (error) {
		console.log(error)
	}
}

// 블로그 상세 페이지 (내용 + 댓글) 가져오기
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
		const comments = await sql_query(`
			select * from dev_blog.comment where C_POST_ID = ${id}
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
			response[0].img = img
		}
		if (comments.length) {
			const result2 = []
			for (const comment of comments) {
				const final = {
					id: comment.C_ID,
					writer: comment.C_WRITER,
					password: comment.C_PASSWORD,
					content: comment.C_CONTENT,
					depth: comment.C_DEPTH,
					post_id: comment.C_POST_ID,
					date: comment.C_MOD_DT,
				}
				result2.push(final)
			}
			response[0].comment = result2
		}
		return response
	} catch (error) {
		console.log(error)
	}
}

// 블로그 상세 페이지 업데이트
blogFunctions.updatePost = async function (updateData) {
	let success = null
	try {
		await sql_query(`
			update dev_blog.post set P_TITLE = '${updateData.title}', P_CONTENT = '${updateData.content}', P_WRITER = '${updateData.writer}' where P_ID = ${updateData.id}
		`)
		if (updateData.img.length) {
			for (const img of updateData.img) {
				await sql_query(`
					insert into dev_blog.file (F_POST_ID, F_IMG) VALUE (${updateData.id}, '${img}');
				`)
			}
		}
		success = true
	} catch (error) {
		success = false
		console.log(error)
	}
	return success
} 

// 블로그 상세 페이지 삭제
blogFunctions.deletePost = async function(id) {
	let success = null
	try {
		const deleteInfo = await sql_query(`
			select F_IMG from dev_blog.file where F_POST_ID = ${id};
		`)
		await sql_query(`
			delete from dev_blog.post where P_ID = ${id};
		`)
		await sql_query(`
			ALTER TABLE dev_blog.post AUTO_INCREMENT=1;
		`)
		await sql_query(`
			SET @CNT = 0;
		`)
		await sql_query(`
			UPDATE dev_blog.post SET dev_blog.post.P_ID = @CNT:=@CNT+1;
		`)
		await sql_query(`
			ALTER TABLE dev_blog.file AUTO_INCREMENT=1;
		`)
		await sql_query(`
			SET @CNT = 0;
		`)
		await sql_query(`
			UPDATE dev_blog.file SET dev_blog.file.F_ID = @CNT:=@CNT+1;
		`)
		if (deleteInfo.length) {
			const deleteFiles = deleteInfo.map(delFile => delFile.F_IMG.split('com/')[1])
			const params = {
				Bucket: 'dev-hong-bucket'
			}
			const s3 = new AWS.S3({
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
                region: process.env.S3_REGION,
            })
			for (const file of deleteFiles) {
				params.Key = file
				s3.deleteObject(params, function(err, data) {
                    if (err) {
                        console.log(err)
                    } else {
						console.log('delete no problem')
					}
                })
			}
		}
		success = true
	} catch (error) {
		success = false
		console.log(error)
	}
	return success
}


export default blogFunctions