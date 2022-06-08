import AppBar from "../../components/index/Header.js";
import BlogContainer from "../../components/blog/Container.js";
import Footer from "../../components/index/Footer.js";
import axios from "axios";
import Head from "next/head";

const Blog = ({ data }) => {
	return (
		<div>
			<Head>
				<meta
					property="og:title"
					content="Welcome to my DEV-HONG blog"
				/>
				<meta
					property="og:description"
					content="성작하는 개발자의 첫 시작으로 블로그를 만들었습니다."
				/>
			</Head>
			<AppBar />
			<BlogContainer data={data} />
			<Footer style={{ backgroundColor: "white" }} />
		</div>
	);
};

export default Blog;

export async function getServerSideProps() {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/posts`
	);
	if (response.data.success) {
		return {
			props: {
				data: response.data.list,
			},
		};
	}
	// NEXT_PUBLIC_API_BASE_URL=http://ec2-15-164-215-13.ap-northeast-2.compute.amazonaws.com:8000
	// DESTINATION_URL = 'https://www.dev-hong.com/api/:path*'
}
