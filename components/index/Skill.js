import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Image from 'next/image'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  box: {
    height: '30vw',
		// backgroundColor: '#e38100'
  },
  skill: {
    marginTop: '6vw',
    textAlign: 'center',
    fontSize: '1.5vw',
  },
	skillMobile: {

	},
  detailImg: {
    marginTop: '4vw',
    height: '5vw',
  },
  detailBox: {
    display: 'inline-block',
    '& div': {
      fontSize: '0.7vw',
    }
  },
	skillImage: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 30,
		fontWeight: 300,
	}
}))

const skill = () => {
  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const divide = 800

  useEffect(() => {
    if (mobile === null) {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }
    window.addEventListener('resize', function() {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }, {passive: true})
  })

  return (
    <Container className={classes.box}>
			<section className={classes.skill}>
				<div style={{color: '#218e16', fontSize: '29px', fontWeight: 600}}>Skills</div>
				<div style={{fontSize: '15px', paddingTop: '1vw', fontWeight: 50}}>
					웹 개발을 하며 사용해본 기술 스택입니다.
				</div>
				<Grid container spacing={5} style={{marginTop: 30}}>
					<Grid item xs={12} sm={6} md={4}>
						<Card>
							<Typography variant="h6" gutterBottom style={{color: '#fa7d00', fontSize: '25px'}}>
								Front-End
							</Typography>
							<Divider />
							<CardContent>
								<Image src={'/images/frontend/html.png'} width={100} height={100} />
								<Image src={'/images/frontend/javascript.png'} width={100} height={100} />
								<Image src={'/images/frontend/css.png'} width={100} height={100} />
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/frontend/react.svg'} width={120} height={90} />
									<span>React</span>
								</div>
								<div className={classes.skillImage}>
									<Image src={'/images/frontend/next2.svg'} width={100} height={100} />
									<span style={{padding: 10}}>Next js</span>
								</div>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/frontend/vue.svg'} width={90} height={90} />
									<span style={{padding: 10}}>Vue</span>
								</div>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/frontend/nuxt.svg'} width={100} height={100} />
									<span style={{padding: 10}}>Nuxt</span>
								</div>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/frontend/vuetify.svg'} width={90} height={90} />
									<span style={{padding: 10}}>Vuetify</span>
								</div>
								<div className={classes.skillImage}>
									<Image src={'/images/frontend/material-ui.svg'} width={90} height={90} />
									<span style={{padding: 10}}>Material UI</span>
								</div>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card>
							<Typography variant="h6" gutterBottom>
								Back-End
							</Typography>
							<Divider />
							<CardContent>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/backend/node.svg'} width={100} height={100} />
									<span style={{padding: 10}}>Node js</span>
								</div>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/backend/express.svg'} width={100} height={100} />
									<span style={{padding: 10}}>Express</span>
								</div>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/backend/mysql.svg'} width={100} height={100} />
									<span style={{padding: 10}}>MySQL</span>
								</div>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/backend/sequelize.svg'} width={100} height={100} />
									<span style={{padding: 10}}>Sequelize</span>
								</div>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Card>
							<Typography variant="h6" gutterBottom>
								DevOps
							</Typography>
							<Divider />
							<CardContent>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/devops/aws.svg'} width={100} height={100} />
									<span style={{padding: 10}}>AWS</span>
								</div>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/devops/docker.svg'} width={100} height={100} />
									<span style={{padding: 10}}>Docker</span>
								</div>
								<div className={classes.skillImage} style={{marginRight: 30}}>
									<Image src={'/images/devops/github.svg'} width={100} height={100} />
									<span style={{padding: 10}}>GitHub</span>
								</div>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</section>
    </Container>
  )
}

export default skill