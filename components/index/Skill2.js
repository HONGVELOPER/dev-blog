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
  skill: {
    marginTop: '3vw',
    // textAlign: 'center',
    fontSize: '1.5vw',
  },
	skillImage: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 30,
		fontWeight: 300,
	},
}))

const Skill2 = (props) => {
  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const [scroll, setScroll] = useState(props.toSkill)
  const divide = 800

  useEffect(() => {
    if (mobile === null) {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }
    window.addEventListener('resize', function() {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    }, {passive: true})
  })

	useEffect(() => {
		if (props.toSkill) {
			// console.log('data in')
			document.querySelector('.skill').scrollIntoView({behavior: 'smooth'})
			props.scrollChange(false)
		}
	})

	const frontEnd = [
		'react2',
		'next2',
		'material-ui',
		'vue2',
		'nuxt2',
		'vuetify',
	]

	const frontEndList = frontEnd.map((name) => (
		// console.log(`/images/frontend/${name}.svg`, 'check')
		<Card key={name} elevation={1} style={{width: 110, border: '1px solid black', backgroundColor: 'black', borderRadius: 0, boxShadow: '1px 1px 1px #3c5c5e', display: 'inline-block', marginRight: '10px'}}>
			<CardContent  style={{border: '1px solid black', margin: 1, marginTop: 1, backgroundColor: 'white'}}>
				<Image src={`/images/frontend/${name}.svg`} width={100} height={100} />
			</CardContent>
			<Divider variant="middle" />
		</Card>
	))

  return (
		<div style={{backgroundColor: 'transparent', marginBottom: '30px'}}>
			<Container>
				<section className={classes.skill}>
					<div className='skill' style={{color: '#218e16', fontSize: '29px', fontWeight: 600}}>Skills</div>
					<div style={{fontSize: '15px', paddingTop: '1vw', fontWeight: 50}}>
						웹 개발을 하며 사용해본 기술 스택입니다.
					</div>
					<Grid container spacing={5} style={{marginTop: 30}}>
						<Grid item xs={12}>
							<Grid container>
								<Grid item xs={12} sm={3}>
									<Typography variant="h6" border={1} gutterBottom style={{color: '#fa7d00', fontSize: '25px'}}>
										Front-End
									</Typography>
								</Grid>
								<Grid item xs={12} sm={9} style={{display: "inline"}}>
									<Card elevation={1} style={{width: 110, border: '1px solid black', backgroundColor: 'black', borderRadius: 0, boxShadow: '1px 1px 1px #3c5c5e', display: 'inline-block', marginRight: '10px'}}>
										<CardContent  style={{border: '1px solid black', margin: 1, marginTop: 1, backgroundColor: 'white'}}>
											<Image src={'/images/frontend/html.png'} width={100} height={100} />
										</CardContent>
										<Divider variant="middle" />
									</Card>
									<Card elevation={1} style={{width: 110, border: '1px solid black', backgroundColor: 'black', borderRadius: 0, boxShadow: '1px 1px 1px #3c5c5e', display: 'inline-block', marginRight: '10px'}}>
										<CardContent  style={{border: '1px solid black', margin: 1, marginTop: 1, backgroundColor: 'white'}}>
											<Image src={'/images/frontend/javascript.png'} width={100} height={100} />
										</CardContent>
										<Divider variant="middle" />
									</Card>
									<Card elevation={1} style={{width: 110, border: '1px solid black', backgroundColor: 'black', borderRadius: 0, boxShadow: '1px 1px 1px #3c5c5e', display: 'inline-block', marginRight: '10px'}}>
										<CardContent  style={{border: '1px solid black', margin: 1, marginTop: 1, backgroundColor: 'white'}}>
											<Image src={'/images/frontend/css.png'} width={100} height={100} />
										</CardContent>
										<Divider variant="middle" />
									</Card>
									{frontEndList}
								</Grid>
							</Grid>
							{/* <Image src={'/images/frontend/html.png'} width={100} height={100} />
							<Image src={'/images/frontend/javascript.png'} width={100} height={100} />
							<Image src={'/images/frontend/css.png'} width={100} height={100} />
							<span>dsada</span>
							<Divider orientation="vertical" /> */}
						</Grid>
					</Grid>
				</section>
			</Container>
		</div>
  )
}

export default Skill2