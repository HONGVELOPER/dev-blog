import AppBar from '../../components/index/Header.js'
import BlogContainer from '../../components/blog/Container.js';
import Footer from '../../components/index/Footer.js'
import axios from 'axios';

const Blog = ({ data }) => {
  return (
    <div>
      <AppBar />
      <BlogContainer data={data} />
      <Footer style={{backgroundColor: "white"}} />
    </div>
  )
}


Blog.getInitialProps = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`)
  const data = response.data
  console.log(data, 'data')
  return {
    data: data,
    // props: {
    // }
  }
}

export default Blog