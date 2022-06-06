import Header from "../../components/index/Header.js";
import DetailContainer from "../../components/blogDetail/Container.js";
import Comment from "../../components/comment/comment.js";
import axios from "axios";
import Head from "next/head";

const BlogDetail = ({ data }) => {
	return (
		<div>
			<Head>
				<meta
					property="og:title"
					content={data.title ? data.title : "blog page"}
				/>
				<meta
					property="og:description"
					content={data.content ? data.content : "blog content"}
				/>
			</Head>
			<Header />
			<DetailContainer post={data} />
			<Comment data={data.comment} />
		</div>
	);
};

export default BlogDetail;

export async function getServerSideProps(context) {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/post/${context.query.id}`
	);
	if (response.data.success) {
		return {
			props: {
				data: response.data,
			},
		};
	}
}
