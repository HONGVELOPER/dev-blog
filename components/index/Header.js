import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';


const useStyles = makeStyles((theme) => ({
  header: {
    height: '60px',
    marginTop: '2%',
    marginLeft: '2%',
    fontWeight: 100,
  },
  login: {
    fontWeight: 50,
    '& div': {
      marginRight: 5,
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  mobileBox: {
    display: 'flex',
  },
  logoButton: {
    margin: '0 auto',
    bottom: '45px',
  },
  list: {
    fontSize: '7vw',
    fontWeight: 200,
    padding: '10px',
    width: '250px',
  }
}))

const Header = (props) => {
  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const [navBar, setNavBar] = useState({ left: false })
  const divide = 800
  
  useEffect(() => {
    if (mobile === null) {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }
    window.addEventListener('resize', function() {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }, {passive: true})
    // console.log(mobile, 'first')
  })

  const toSkill = () => {
    props.scrollChange(true)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setNavBar({ ...navBar, [anchor]: open });
  }

  const list = (anchor) => (
    <div
      className={classes.list}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Button href="../about" style={{display: 'block'}}>
        About
      </Button>
      {/* <Button href="../project" style={{display: 'block'}}>Project</Button>   */}
      <Button href="../blog" style={{display: 'block'}}>Blog</Button>  
      <Button href="https://github.com/Young-Jin1003" style={{display: 'block'}}>Github</Button>
    </div>
  )

  return (
    <Container>
      <AppBar elevation={0} position="static" color="transparent">
        <div className={classes.header}>
          {mobile ? (
            <Grid container spacing={2} style={{minWidth: '325px'}}>
              <Grid item xs={12}>
                <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                  <MenuIcon />
                </IconButton>
                <Box className={classes.mobileBox}>
                  <Button className={classes.logoButton} href="/">
                    <span style={{color: '#218e16'}}>DEV</span>&nbsp;Hong
                  </Button>
                </Box>
                <Drawer anchor={'left'} open={navBar.left} onClose={toggleDrawer('left', false)}>
                  {list('left')}
                </Drawer>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} style={{marginTop: '1px',}}>
              <Button href="/">
                <span style={{color: '#218e16'}}>DEV</span>&nbsp;Hong
              </Button>
              <div style={{display: 'flex', marginLeft: 'auto', marginRight: '50px'}}>
                <Button href="../about" style={{fontWeight: 50}}>
                  About
                </Button>
                <Button id="skill" onClick={toSkill} style={{fontWeight: 50, marginLeft: '20px'}}>
                  Skill
                </Button>
                <Button href="../blog" style={{marginLeft: '20px', fontWeight: 50}}>Blog</Button>  
                <Button href="https://github.com/Young-Jin1003" style={{marginLeft: '20px', fontWeight: 50}}>Github</Button>
              </div>
            </Grid>
          )}
        </div>
        <Divider></Divider>
        <Drawer anchor={'left'} open={navBar.left} onClose={toggleDrawer('left', false)}>
          {list('left')}
        </Drawer>
      </AppBar>
    </Container>
  )
}

export default Header