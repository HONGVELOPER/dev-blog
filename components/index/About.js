import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '40px',
		// height: '200px',
	},
	about: {
		marginTop: '4vh',
		fontSize: '32px',
		textAlign: 'center',
		'&::after': {
			content: "''",
			display: 'block',
			width: '60px',
			borderBottom: '3px solid #218e16',
			margin: '10px auto'
		}
	}
}))

const about = (props) => {

	const classes = useStyles()

	useEffect(() => {
		if (props.toAbout) {
			document.querySelector('.about').scrollIntoView({behavior: 'smooth'})
			props.scrollChange(false)
		}
	})

	return (
		<Container className={classes.root}>
			<Grid container spacing={2} className='about'>
				<Grid item xs={12} sm={4} className={classes.about}>
					About Me
				</Grid>
				<Grid item xs={12} sm={8}>
					<h2>노력하는 사람</h2>
					<div>
						문제를 해결해가는 과정에서의 생각의 연속과, 해결했을 때의 성취감이 저를 나아가게 합니다.<br />
						이러한 성취가 지지치 않고, 끊임없는 동기가 되어 성장하는 백엔드 개발자가 되고싶습니다.<br />
						저의 가치관은 "현재의 위치는 내가 늦어도, 현재의 속도는 내가 더 빠르다" 입니다.<br /><br />
						꾸준히 노력하는 개발자가 되기위한 첫 걸음으로 기술 블로그를 만들었습니다.<br />
						{/* 아직은 서툰 블로그 이지만, 성장하는 개발자가 될 것입니다. */}
					</div>
				</Grid>
			</Grid>
			<Divider style={{marginTop: '50px'}} />
		</Container>
	)
}

export default about