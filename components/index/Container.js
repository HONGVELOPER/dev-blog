import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    height: '25vw',
    minHeight: '150px',
  },
  bgImage: {
    border: '1px solid black',
    zIndex: -1,
  },
  bgText: {
    margin: 0,
    marginBottom: '8vw',
    paddingLeft: '15vw',
  },
  bgTextMobile: {
    marginBottom: '5vw',
    paddingLeft: '15vw',
  },
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

  const hello = () => (
    <div>
      Hello,  
    </div>
  )

  return (
    <Box className={classes.box}>
      <div>
        <Image className={classes.bgImage} src={'/images/indexImage.jpg'} layout='fill'></Image>
      </div>
      {mobile ? (
        <section className={classes.bgTextMobile}>
          <Box>
            <div style={{fontSize: '4vw', paddingTop: '11vw', color:'#218e16', fontWeight: 500}}>
              안녕하세요,
            </div>
            <div style={{fontSize: '2vw', marginTop: '1vw'}}>
              웹 브라우저로 생각을 표현하는 개발자 홍영진입니다.<br />
              Next js 로 웹 애플리케이션을 구축합니다.
            </div>
          </Box>
        </section>
      ) : (
        <section className={classes.bgText}>
          <Box>
            <div style={{fontSize: '40px', paddingTop: '12.5vw', color:'#218e16', fontWeight: 500}}>
              안녕하세요,
            </div>
            <div style={{fontSize: '20px', marginTop: '1vw'}}>
              웹 브라우저로 사람을 연결하는 개발자 홍영진입니다.<br />
              Next js 로 웹 애플리케이션을 구축합니다.
            </div>
          </Box>
        </section>
      )}
      {/* <section className={classes.project}>
        <Card variant='outlined'>
          <CardContent>
            <div>hi</div>
          </CardContent>
        </Card>
      </section> */}
    </Box>
  )
}

export default container