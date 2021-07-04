import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  box: {
    position: 'relative',
    height: '25vw',
  },
  bgImage: {
    zIndex: -1,
  },
  bgText: {
    // border: '2px solid black',
    margin: 0,
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
  project: {

  }
}))

const container = () => {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <Image className={classes.bgImage} src={'/images/indexImage.jpg'} layout='fill'></Image>
      <section className={classes.bgText}>
        <div style={{fontSize: '2vw', paddingTop: '14vw', color:'#218e16', fontWeight: 500}}>안녕하세요,</div>
        <div style={{fontSize: '1.2vw', marginTop: '1vw'}}>
          웹 브라우저로 사람을 연결하는 개발자 홍영진입니다.<br />
          Next js & Node js 로 웹 애플리케이션을 구축합 니다.
        </div>
      </section>
      <section className={classes.skill}>
        <div style={{color: '#218e16'}}>Skills</div>
        <div style={{fontSize: '0.9vw', paddingTop: '1vw', fontWeight: 50}}>
          웹 개발 파트별로 정리한 간략한 기술 스택입니다.<br />
          분야별 기술에 대하여 더 자세한 내용은 소개 페이지에서 확인 하실 수 있습니다.
        </div>
        <div className={classes.detailImg}>
          <Box className={classes.detailBox} style={{marginRight: '13vw'}}>
            <Image src={'/images/frontend4.png'} width={100} height={100} />
            <div style={{paddingTop: '0.7vw'}}>
              <div style={{fontSize: '1vw', paddingBottom: '1vw'}}>Front-End</div>
              HTML·CSS·JQuery 웹 퍼블리싱<br />
              Vue·React SPA 개발
            </div>
          </Box>
          <Box className={classes.detailBox} style={{marginRight: '13vw'}}>
            <Image src={'/images/backend2.png'} width={100} height={100} />
            <div style={{paddingTop: '0.7vw'}}>
              <div style={{fontSize: '1vw', paddingBottom: '1vw'}}>Back-End</div>
              SpringBoot·NodeJS API 구축<br />
              MySQL DB 스키마 설계
            </div>
          </Box>
          <Box className={classes.detailBox}>
            <Image src={'/images/server.png'} width={100} height={100} />
            <div style={{paddingTop: '0.7vw'}}>
              <div style={{fontSize: '1vw', paddingBottom: '1vw'}}>DEV-OPS</div>
              Linux·AWS 서버 구축<br />
              Git 버전관리
            </div>
          </Box>
        </div>
      </section>
      <section className={classes.project}>
        <Card variant='outlined'>
          <CardContent>
            <div>hi</div>
          </CardContent>
        </Card>
      </section>
    </Box>
  )
}

export default container