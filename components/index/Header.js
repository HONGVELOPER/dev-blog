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
import { useRouter } from 'next/router';


const useStyles = makeStyles((theme) => ({
  header: {
    height: '60px',
    marginTop: '2%',
    marginLeft: '2%',
    fontWeight: 100,
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
    // backgroundColor: '#218e16'
  },
  hover: {
    fontWeight: 70,
    marginLeft: 20,
    "&:hover": {
      color: '#218e16',
      backgroundColor: "#FFF"
    }
  },
  mobileHover: {
    display: 'block',
    fontWeight: 70,
    "&:hover": {
      color: '#218e16',
      backgroundColor: "#FFF"
    }
  },
}))

const Header = (props) => {

  const router = useRouter()
  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const [navBar, setNavBar] = useState({ left: false })
  const divide = 800
  
  useEffect(() => {
    // const refer = document.referrer
    // console.log(refer, 'check')
    // console.log(window.history, 'history')
    if (mobile === null) {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    } else {
      window.addEventListener('resize', function() {
        window.innerWidth < divide ? setMobile(true) : setMobile(false)
      }, {passive: true})
    }
  })

  const moveToAbout = () => {
    // console.log('진입', router)
    if (router.pathname !== "/") {
      router.push('/')
    } else {
      // console.log('여기는?')
      props.toAbout(true)
    }
  }

  const moveToSkill = () => {
    props.toSkill(true)
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
      <div>
        <Button className={classes.mobileHover} onClick={moveToAbout}>About</Button>
        <Button className={classes.mobileHover}onClick={moveToSkill}>Skill</Button>
        <Button className={classes.mobileHover} href="../blog" >Blog</Button>
        <Button className={classes.mobileHover} href="https://github.com/Young-Jin1003">Github</Button>
      </div>
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
                <Button className={classes.hover} onClick={moveToAbout}>About</Button>
                <Button className={classes.hover}onClick={moveToSkill}>Skill</Button>
                <Button className={classes.hover} href="../blog" >Blog</Button>
                <Button className={classes.hover} href="https://github.com/Young-Jin1003">Github</Button>
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