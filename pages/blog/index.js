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

export default Blog

export async function getServerSideProps() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog`)
  return {
    props: {
      data: response.data,
    }
  }
}
