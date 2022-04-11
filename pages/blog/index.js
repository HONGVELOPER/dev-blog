import AppBar from "../../components/index/Header.js";
import BlogContainer from "../../components/blog/Container.js";
import Footer from "../../components/index/Footer.js";
import axios from "axios";

const Blog = ({ data }) => {
	return (
		<div>
			<AppBar />
			<BlogContainer data={data} />
			<Footer style={{ backgroundColor: "white" }} />
		</div>
	);
};

export async function getServerSideProps() {
	const start = new Date();
	console.log("request 시작");
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/post`
	);
	console.log("response 응답");
	const end = new Date();
	console.log("ttfb : ", end - start);
	return {
		props: {
			data: response.data,
		},
	};
}

export default Blog;
