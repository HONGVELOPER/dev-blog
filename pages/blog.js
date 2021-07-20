import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/index/Header.js'
import Container from '../components/blog/Container.js';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F1F1F1',
    height: '100vw'
  },
}))

function Blog(response) {
  const classes = useStyles()
  return (
    <div>
      <AppBar></AppBar>
      <Container></Container>
    </div>
  )
}

export default Blog

export async function getServerSideProps() {
  const response = await axios.get('http://localhost:3000/api/blog')
  console.log(response.data, 'response check')
  return {
    props: {
      item: response.data
    }
  }
}