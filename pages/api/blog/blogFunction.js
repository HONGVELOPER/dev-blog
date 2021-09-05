import { sql_query } from '../../../lib/db';
import AWS from 'aws-sdk';

const blogFunctions = {}

// 블로그 글 포스팅하기
blogFunctions.blogPost = async function (postData) {
	console.log(postData, 'post data ')
	let success =  null
	try {
		const result = await sql_query(`
			insert into ${process.env.DB_DATABASE}.post (P_TITLE, P_CONTENT, P_WRITER)
			VALUE ('${postData.title}', '${postData.content}', '${postData.writer}');
		`)
		if (postData.img.length) {
			for (const img of postData.img) {
				await sql_query(`
					insert into ${process.env.DB_DATABASE}.file (F_POST_ID, F_IMG) VALUE (${result.insertId}, '${img}');
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
		console.log('진입??????\n\n\n\n')
		const response = []
		const results = await sql_query(`
			select * from ${process.env.DB_DATABASE}.post order by P_ID desc
		`)
		console.log(results, '??\n\n\n\n\n\n\n')
		const images = await sql_query(`
			select * from ${process.env.DB_DATABASE}.file where F_ID in (select min(F_ID) from ${process.env.DB_DATABASE}.file group by F_POST_ID) order by F_ID desc
		`)
		for (const result of results) {
			const temp = result.P_MOD_DT.split(' ')[0]
			const dateEdit = temp.split('-')[0] + '년' + temp.split('-')[1] + '월' + temp.split('-')[2] + '일'
			const final = {
				id : result.P_ID,
				title: result.P_TITLE,
				content: result.P_CONTENT.replace(/(<([^>]+)>)/ig,"").substring(0, 90) + ' ···',
				view: result.P_VIEW,
				writer: result.P_WRITER,
				date: dateEdit,
			}
			if (images.length) {
				for (const img of images) {
					if (img.F_POST_ID === result.P_ID) {
						final.img = img.F_IMG
					}
				}
			}
			if (!final.img) {
				final.img = 'https://dev-hong-bucket.s3.ap-northeast-2.amazonaws.com/developer-5063843_1920.jpg'
			}
			response.push(final)
		}
		return response
	} catch (error) {
		console.log(error)
	}
}

// 블로그 상세 페이지 (내용) 가져오기
blogFunctions.getOnePost = async function (id) {
	try {
		await sql_query(`
			update ${process.env.DB_DATABASE}.post set P_VIEW = P_VIEW + 1 where P_ID = ${id}
		`)
		const result = await sql_query(`
			select * from ${process.env.DB_DATABASE}.post where P_ID = ${id}
		`)
		const img = await sql_query(`
			select F_IMG from ${process.env.DB_DATABASE}.file where F_POST_ID = ${id}
		`)
		const temp = result[0].P_MOD_DT.split(' ')[0]
		const dateEdit = temp.split('-')[0] + '년' + temp.split('-')[1] + '월' + temp.split('-')[2] + '일'
		const response = [{
			id: result[0].P_ID,
			title: result[0].P_TITLE,
			content: result[0].P_CONTENT,
			view: result[0].P_VIEW,
			writer: result[0].P_WRITER,
			date: dateEdit,
		}]
		if (img.length) {
			response[0].img = img
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
			update ${process.env.DB_DATABASE}.post set P_TITLE = '${updateData.title}', P_CONTENT = '${updateData.content}', P_WRITER = '${updateData.writer}' where P_ID = ${updateData.id}
		`)
		if (updateData.img.length) {
			for (const img of updateData.img) {
				await sql_query(`
					insert into ${process.env.DB_DATABASE}.file (F_POST_ID, F_IMG) VALUE (${updateData.id}, '${img}');
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
			select F_IMG from ${process.env.DB_DATABASE}.file where F_POST_ID = ${id};
		`)
		await sql_query(`
			delete from ${process.env.DB_DATABASE}.post where P_ID = ${id};
		`)
		await sql_query(`
			ALTER TABLE ${process.env.DB_DATABASE}.post AUTO_INCREMENT=1;
		`)
		await sql_query(`
			SET @CNT = 0;
		`)
		await sql_query(`
			UPDATE ${process.env.DB_DATABASE}.post SET ${process.env.DB_DATABASE}.post.P_ID = @CNT:=@CNT+1;
		`)
		await sql_query(`
			ALTER TABLE ${process.env.DB_DATABASE}.file AUTO_INCREMENT=1;
		`)
		await sql_query(`
			SET @CNT = 0;
		`)
		await sql_query(`
			UPDATE ${process.env.DB_DATABASE}.file SET ${process.env.DB_DATABASE}.file.F_ID = @CNT:=@CNT+1;
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


// update, delete 비밀번호 확인
blogFunctions.passwordCheck = async function(data) {
	console.log('password 진입')
	let success = null
	try {
		if (data.password === process.env.ADMIN_KEY) {
			success = true
		} else {
			success = false
		}
	} catch (error) {
		success = false
		console.log(error)
	}
	return success
}

export default blogFunctions