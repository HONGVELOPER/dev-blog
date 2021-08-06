import commentFunction from './commentFunction'

const commentHandler = async(req, res) => {
    console.log(req.method, 'comment method check')
    if (req.method === 'POST') {
        try {
            console.log(req.body, 'body check')
            const result = await commentFunction.postComment(req.body)
            if (result) {
                return res.status(200).send({})
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: error.meesage })
        }
    }
}

export default commentHandler