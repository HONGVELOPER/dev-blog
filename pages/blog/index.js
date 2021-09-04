import AppBar from '../../components/index/Header.js'
import Container from '../../components/blog/Container.js';
import Footer from '../../components/index/Footer.js'
import axios from 'axios';
import React from 'react';

// export default function Blog({ data }) {
//   console.log(data, 'check')
//   return (
//     <div>
//       <AppBar />
//       <Container data={data} />
//       <Footer style={{backgroundColor: "white"}} />
//     </div>
//   )
// }

// export async function getServerSidePorps() {
//   console.log('ssr rendering start')
//   try {
//     const response = await axios.get('http://localhost:3000/api/blog')
//     console.log(response, 'check')
//     return {
//       props: {
//         data: response.data,
//       }
//     }
//   } catch {
//     console.log('blog index page render fail')
//   }
// }

// // export default Blog

const Blog = ({ data }) => {

  return (
    <div>
      <AppBar />
      <Container data={data} />
      <Footer style={{backgroundColor: "white"}} />
    </div>
  )
}

Blog.getInitialProps = async () => {
  const response = await axios.get('https://developerhong.com/api/blog')
  return {
    data: response.data
    // entries: data.entries,
    // posts: data.posts,
  }
}

export default Blog
