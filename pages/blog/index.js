import AppBar from '../../components/index/Header.js'
import Container from '../../components/blog/Container.js';
import Footer from '../../components/index/Footer.js'
import axios from 'axios';

const Blog = ({ data }) => {

  return (
    <div>
      <AppBar />
      {/* <Container data={data} /> */}
      <Footer style={{backgroundColor: "white"}} />
    </div>
  )
}

export default Blog

// export async function getServerSideProps() {
//   console.log('ssr rendering start')
//   const response = await axios.get('http://localhost:3000/api/blog')
//   // console.log(response.data, 'response check')
//   return {
//     props: {
//       data: response.data,
//     }
//   }
// }