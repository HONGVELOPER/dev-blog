import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    minHeight: '175px',
  },
  bgImage: {
    zIndex: -1,
  },
  indexText: {
    display: 'flex',
    height: '37vw',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  }
}))

const container = () => {
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
    }
    window.addEventListener('resize', function() {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }, {passive: true})
  })

  return (
    <>
      <Box className={classes.box}>
        <div className={classes.bgImage}>
          <Image src={'/images/main.jpg'} layout='fill' objectFit="cover" />
        </div>
        <div className={classes.indexText}>
          {mobile ? (
            <>
              <Box style={{position: 'relative'}}>
                <Typography style={{fontSize: '4.5vw'}}>{hello}</Typography>
                <Typography style={{fontSize: '2.5vw'}}>{introduce}</Typography>
              </Box>
            </>
          ) : (
            <>
              <Box style={{position: 'relative'}}>
                <Typography style={{fontSize: '45px', fontWeight: 500}}>{hello}</Typography>
                <Typography style={{fontSize: '25px'}}>{introduce}</Typography>
              </Box>
            </>
          )}
        </div>
      </Box>
    </>
  )
}

export default container