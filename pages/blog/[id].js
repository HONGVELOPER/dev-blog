import Header from '../../components/index/Header.js';
import DetailContainer from '../../components/blogDetail/Container.js';
import Comment from '../../components/comment/comment.js';
import axios from 'axios';

const BlogDetail = ({ data }) => {
	// const classes = useStyles()

	return (
		<div>
			<Header />
			<DetailContainer data={data}  />
			<Comment data={data.comment} />
		</div>
	)	
}

export default BlogDetail

export async function getServerSideProps(context) {
	const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`, {
		params: {
			id: context.query.id,
		}
	})
	// (<u class="ul-\d">[\d\w]+<\/u>)
	const tocData = []
	const tocArray = response.data[0].content.match(/(<u class="ul-\d">[a-zA-Z0-9.]+<\/u>)/gm)
	for (const data of tocArray) {
		const result = data.replace(/(<([^>]+)>)/ig,"")
		tocData.push(result)
	}
	response.data[0].tocData = tocData
	return {
	 	props: {
			data: response.data[0],
	  	}
	}
}