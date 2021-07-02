import Container from '../components/blog/Container.js';
import NavBar from '../components/NavBar.js';
import { makeStyles } from '@material-ui/core/styles';

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
      <NavBar></NavBar>
      <Container></Container>
    </div>
  )
}

export default Blog