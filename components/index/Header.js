import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  header: {
    height: '60px',
    marginTop: '2%',
    marginLeft: '2%',
    fontWeight: 100,
  },
  login: {
    marginLeft: '83%',
    bottom: 40
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  }
}))

const Header = () => {
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <AppBar elevation={0} position="static" color="transparent">
        <div className={classes.header}>
          <Button>dev Hong</Button>
          <Button style={{marginLeft: '100px'}}>소개</Button>
          <Button style={{marginLeft: '10px'}}>프로젝트</Button>  
          <Button href="../blog" style={{marginLeft: '10px'}}>블로그</Button>  
          <Button style={{marginLeft: '10px'}}>깃허브</Button>
          <Button className={classes.login}>
            <Avatar className={classes.avatar} />
            로그인
          </Button>  
        </div>
        <Divider></Divider>
      </AppBar>
    </Container>
  )
}

export default Header