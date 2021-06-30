import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

const Header = () => {
  return (
    <div>
      <AppBar position="static" color="transparent">
        <div style={{textAlign: "right"}}>
          <Button style={{color: "white"}}>intoduction</Button>
          <Button style={{color: "white"}}>project</Button>  
          <Button href="../blog"  style={{color: "white"}}>blog</Button>  
          <Button style={{color: "white"}}>github</Button>  
        </div>
      </AppBar>
    </div>
  )
}

export default Header