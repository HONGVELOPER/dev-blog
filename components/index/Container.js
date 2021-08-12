import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    height: '600px',
    // minHeight: '150px',
  },
  boxMobile: {
    position: 'relative',
    height: '250px',
    // minHeight: '15/0x',
  },
  bgImage: {
    zIndex: -1,
  },
  indexText: {
    textAlign: 'center',
    paddingTop: '30vh',
    // display: 'flex',
    height: '37vw',
    minHeight: '35vw',
    // alignItems: 'center',
    // justifyContent: 'center',
    color: 'white',
  }
}))

const container = () => {
  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const divide = 1000

  useEffect(() => {
    if (mobile === null) {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }
    window.addEventListener('resize', function() {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }, {passive: true})
    console.log(mobile, 'first')
  })

  return (
    <>
      <section>
        {mobile ? (
          <Box className={classes.boxMobile}>
            <div>
              <Image className={classes.bgImage} src={'/images/main.jpg'} layout='fill' objectFit="cover" />
            </div>
            <div className={classes.indexText}>
              <div style={{fontSize: '4.5vw', fontWeight: 500}}>
                안녕하세요,
              </div>
              <div style={{fontSize: '2.5vw', fontWeight: 300}}>
                웹 브라우저로 생각을 표현하는 개발자 홍영진입니다.<br />
                Next js 로 웹 애플리케이션을 구축합니다.
              </div>
            </div>
          </Box>
        ) : (
          <Box className={classes.box}>
            <div>
              <Image className={classes.bgImage} src={'/images/main.jpg'} layout='fill' objectFit="cover" />
            </div>
            <div className={classes.indexText}>
              <div style={{fontSize: '45px', fontWeight: 500}}>
                안녕하세요,
              </div>
              <div style={{fontSize: '25px', fontWeight: 300}}>
                웹 브라우저로 생각을 표현하는 개발자 홍영진입니다.<br />
                Next js 로 웹 애플리케이션을 구축합니다.
              </div>
            </div>
          </Box>
        )}
      </section>
      {/* <section className={classes.project}>
        <Card variant='outlined'>
          <CardContent>
            <div>hi</div>
          </CardContent>
        </Card>
      </section> */}
    </>
  )
}

export default container