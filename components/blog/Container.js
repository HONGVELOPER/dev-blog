import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    border: '1px solid black',
    width: '1000px',
  },
  header: {
    marginTop: '100px',
    textAlign: 'center',
  },
  headerFont: {
    borderBottom: '1px solid black',
    fontSize: '24px',
  }
}))

const BlogContainer = () => {
  const classes = useStyles()
  return (
    <Container className={classes.container}>
      <div className={classes.header}>
        <span className={classes.headerFont}>&nbsp;전체 글&nbsp;</span>
      </div>
    </Container>
  )
}

export default BlogContainer