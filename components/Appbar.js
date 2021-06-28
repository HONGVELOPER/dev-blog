import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import styles from '../styles/container.module.css';

const Appbar = () => {
  return (
    <div style={{backgroundColor: "black", height: "100vh", width: "100%"}}>
      <AppBar position="static" color="transparent">
        <div style={{textAlign: "right"}}>
          <Button style={{color: "white"}}>intoduction</Button>
          <Button style={{color: "white"}}>project</Button>  
          <Button style={{color: "white"}}>blog</Button>  
          <Button style={{color: "white"}}>github</Button>  
        </div>
      </AppBar>
      <Container
        // style={contain}
      >
        <div className={styles.wrapper}>
          <div>
            Hi, I`m YoungJin Hong
          </div>
          <div>
            I`m full stack web developer
          </div>
          <Button
            variant="outlined"
            color="secondary"
            style={{
              color: "white",
              marginTop: "20px",
            }}
            href="/"
          >
            Clike here
          </Button>  
        </div>
        
      </Container>
    </div>
  )
}

export default Appbar 