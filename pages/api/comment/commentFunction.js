import { sql_query } from '../../../lib/db';

const commentFunctions = {}

// 댓글 등록
commentFunctions.postComment = async function (postData) {
    let success = false
    try {
        const result = await sql_query(`
            insert into dev_blog.comment (C_WRITER, C_PASSWORD, C_CONTENT, C_DEPTH, C_POST_ID)
            VALUE ('${postData.writer}', '${postData.password}', '${postData.content}', ${postData.depth}, ${postData.postId.id});
        `)
        console.log(result)
        success = true
    } catch (error) {
        success = false
        console.log(error)
    }
    return success
}

export default commentFunctions