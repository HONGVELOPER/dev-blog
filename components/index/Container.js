import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    height: '90vh',
    width: '99vw',
    padding: 10
  },
  bgImage: {
    zIndex: -1,
    opacity: 0.5,
  },
  indexText: {
    margin: 0,
    fontSize: '2rem',
    lineHeight: '3rem',
    textAlign: 'center',
    paddingTop: '40vh',
    textShadow: '1px 1px 1px #3c5c5e',
    color: 'white'
  }
}))

const container = () => {


  // const router = useRouter()
  // console.log(router, 'index container router')
  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const divide = 800
  const hello = <div>안녕하세요,</div>
  const introduce = <div>
    웹 브라우저로 생각을 표현하는 개발자 홍영진입니다.<br />
    Next js 로 웹 애플리케이션을 구축합니다. 
  </div>

  useEffect(() => {
    if (mobile === null) {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    } else {
      window.addEventListener('resize', function() {
        window.innerWidth < divide ? setMobile(true) : setMobile(false)
      }, {passive: true})
    }
  })

  return (
    <>
      <Box className={classes.box}>
        <div className={classes.bgImage}>
          <Image src={'/images/main.jpg'} layout='fill' objectFit="cover" quality={60}/>
        </div>
        <div className={classes.indexText}>
          {mobile ? (
            <>
              <Box style={{position: 'relative', marginTop: '3.5vw', marginLeft: '5vw'}}>
                <div style={{fontSize: '6vw', fontWeight: 600, color: '#218e16'}}>{hello}</div>
                <div style={{fontSize: '4vw', fontWeight: 600}}>{introduce}</div>
              </Box>
            </>
          ) : (
            <>
              <Box style={{position: 'relative', marginTop: '3.5vw', marginLeft: '5vw'}}>
                <div style={{fontSize: '45px', fontWeight: 600, color: '#218e16'}}>{hello}</div>
                <div style={{fontSize: '25px', fontWeight: 500}}>{introduce}</div>
              </Box>
            </>
          )}
        </div>
      </Box>
    </>
  )
}

export default container