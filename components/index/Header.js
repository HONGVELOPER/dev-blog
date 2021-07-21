import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

// header 반응형 수정해야함 데스크탑일때랑, 패드 이하일때 분기시켜서 font Size 수정

const useStyles = makeStyles((theme) => ({
  header: {
    height: '60px',
    marginTop: '2%',
    marginLeft: '2%',
    fontWeight: 100,
    // border: '1px solid black'
  },
  login: {
    fontWeight: 50,
    '& div': {
      marginRight: 5,
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}))

const Header = () => {
  const classes = useStyles()
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    // console.log(window.innerWidth)
    window.innerWidth < 800 ? setMobile(true) : setMobile(false)
    // window.addEventListener('resize', function() {
    //   window.innerWidth < 800 ? setMobile(true) : setMobile(false)
    // })
    console.log(mobile)
  })


  return (
    <Container>
      <AppBar elevation={0} position="static" color="transparent">
          <div className={classes.header}>
            <div>{mobile}</div>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <Button href="../home">
                  <span style={{color: '#218e16'}}>DEV</span>&nbsp;Hong</Button>
                <Button href="../introduce" style={{marginLeft: '4vw', fontWeight: 50}}>
                  소개
                </Button>
                <Button href="../project" style={{marginLeft: '0.5vw', fontWeight: 50}}>프로젝트</Button>  
                <Button href="../blog" style={{marginLeft: '0.5vw', fontWeight: 50}}>블로그</Button>  
                <Button href="https://github.com/Young-Jin1003" style={{marginLeft: '0.5vw', fontWeight: 50}}>깃허브</Button>
              </Grid>
              <Grid item xs={2}>
                <Button className={classes.login}>
                  <Avatar />
                  <span>로그인</span>
                </Button>
              </Grid>
            </Grid>
          </div>
          <div style={{border: '1px solid black'}}>{ mobile }</div>
        <Divider></Divider>
      </AppBar>
    </Container>
  )
}

export default Header