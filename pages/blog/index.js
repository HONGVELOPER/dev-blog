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

export async function getServerSideProps() {
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/post`
	);
	return {
		props: {
			data: response.data,
		},
	};
}

export default Blog;
