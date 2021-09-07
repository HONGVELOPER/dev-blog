import Header from '../../components/index/Header.js';
import DetailContainer from '../../components/blogDetail/Container.js';
import Comment from '../../components/comment/comment.js';
import axios from 'axios';

const BlogDetail = ({ data }) => {
	// const classes = useStyles()

	return (
		<div>
			<Header />
			<DetailContainer data={data} />
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
	return {
	  props: {
			data: response.data[0],
	  }
	}
}