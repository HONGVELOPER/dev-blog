import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    height: '100vh',
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
    paddingTop: '20vh',
    textShadow: '1px 1px 1px #3c5c5e',
    color: 'white'
  }
}))

const container = () => {

  const classes = useStyles()
  
  const [mobile, setMobile] = useState(null)
  const divide = 800
  // const hello = <div>안녕하세요,</div>
  const introduce =  '안녕하세요.\n웹 브라우저로 생각을 표현하는 개발자 홍영진입니다.\n Next js 로 웹 애플리케이션을 구축합니다.'

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
              <Box style={{position: 'relative', marginLeft: '5vw'}}>
                <div style={{fontSize: '6vw', fontWeight: 600, color: '#218e16'}}>{hello}</div>
                <div style={{fontSize: '4vw', fontWeight: 600}}>{introduce}</div>
              </Box>
            </>
          ) : (
            <>
              <Box style={{position: 'relative', marginLeft: '5vw'}}>
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