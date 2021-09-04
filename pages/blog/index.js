import AppBar from '../../components/index/Header.js'
import Container from '../../components/blog/Container.js';
import Footer from '../../components/index/Footer.js'
import axios from 'axios';
import React from 'react';

const Blog = ({ data }) => {
  const data2 = [
    {
      id: 2,
      title: 'rds ',
      content: 'check ···',
      view: 0,
      writer: 'dev hong',
      date: '2021년09월04일',
      img: 'https://dev-hong-bucket.s3.ap-northeast-2.amazonaws.com/developer-5063843_1920.jpg'        
    },
  ]
  return (
    <div>
      <AppBar />
      <Container data={data2} />
      <Footer style={{backgroundColor: "white"}} />
    </div>
  )
}

// Blog.getInitialProps = async () => {
//   console.log('ssr rendering start')
//   const response = await axios.get('http://localhost:3000/api/blog')
//   console.log(response.data, 'check')
//   return {
//     // props: {
//     data: response.data,
//     // }
//   }
// }

export default Blog
