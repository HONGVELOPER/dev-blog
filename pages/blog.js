import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../components/index/Header.js'
import Container from '../components/blog/Container.js';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F1F1F1',
    height: '100vw'
  },
}))

function Blog() {
  const classes = useStyles()
  return (
    <div>
      <AppBar></AppBar>
      <Container></Container>
    </div>
  )
}

export default Blog