import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    height: '30vw',
  },
  bgImage: {
    border: '1px solid black',
    zIndex: -1,
  },
  bgText: {
    margin: 0,
    marginBottom: '7vw',
    paddingLeft: '15vw',
  },
  bgTextMobile: {
    marginBottom: '5vw',
    paddingLeft: '15vw',
  },
  skill: {
    marginTop: '8.5vw',
    textAlign: 'center',
    fontSize: '1.5vw',
    height: '30vw',
  },
  detailImg: {
    marginTop: '5vw',
    height: '5vw',
  },
  detailBox: {
    display: 'inline-block',
    '& div': {
      fontSize: '0.7vw',
    }
  },
}))

const container = () => {
  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const divide = 900

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
    <Box className={classes.box}>
      <div>
        <Image className={classes.bgImage} src={'/images/indexImage.jpg'} layout='fill'></Image>
      </div>
      {mobile ? (
        <section className={classes.bgTextMobile}>
          <Box>
            <div style={{fontSize: '4vw', paddingTop: '16vw', color:'#218e16', fontWeight: 500}}>
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
            <div style={{fontSize: '40px', paddingTop: '15vw', color:'#218e16', fontWeight: 500}}>
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