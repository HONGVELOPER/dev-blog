// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '../../components/index/Header.js'
// import Container from '../../components/blog/Container.js';
// import Modal from '../../components/posting/modal.js'
// // import Pagination from '../../components/blog/pagination.js';
// import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: '#F1F1F1',
//     height: '100vw'
//   },
// }))

// const Blog = ({ data }) => {
//   const classes = useStyles()
//   return (
//     <div>
//       <AppBar />
//       <Modal />
//       <Container data={data} />
//       {/* <Pagination /> */}
//     </div>
//   )
// }

// export default Blog

// export async function getServerSideProps() {
//   const response = await axios.get('http://localhost:3000/api/blog')
//   // console.log(response.data, 'response check')
//   return {
//     props: {
//       data: response.data,
//     }
//   }
// }