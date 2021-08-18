import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '40px',
		height: '200px',
	},
	about: {
		marginTop: '4vh',
		textAlign: 'center',
		fontSize: '32px',
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
				<Grid item xs={4} className={classes.about}>
					About Me
				</Grid>
				<Grid item xs={8}>
					<h2>노력하는 사람</h2>
					<div>
						어릴때 부터 호기심이 많은 성격에 만들어 보았던 간단한 계산기 프로그램으로 무언가를 만드는 것의 재미를 느끼게 되었고 그때부터 개발자를 꿈꾸게 되었습니다.
						계속해서 완성도 높은 코드, 그리고 완성도 높은 UI를 위해 매일 고뇌하는 사람이 되도록 하겠습니다.
						잘부탁드립니다.
					</div>
				</Grid>
			</Grid>
		</Container>
	)
}

export default about