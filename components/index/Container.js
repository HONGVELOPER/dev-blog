import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 870,
      lg: 1280,
      xl: 1920
    }
  }
})

const useStyles = makeStyles((theme) => ({
	root: {
    	padding: 10
	},
	indexText: {
		fontSize: '42px',
		fontWeight: 600,
		paddingTop: '12vh',
		paddingBottom: '11vh',
		paddingLeft: '6vw',
		minHeight: '520px',
	},
	mobileIndexText: {
		fontSize: '6vw',
		fontWeight: 600,
		paddingTop: '5vh',
		paddingBottom: '2vh',
		paddingLeft: '5vw',
	},
	indexImage: {
		// border: '1px solid black',
		position: 'relative',
		maxWidth: '450px',
		padding: 30,
		left: '5vw',
	},
}))

const Container2 = () => {

	const classes = useStyles()
	const [mobile, setMobile] = useState(null)
	const divide = 870

	useEffect(() => {
		if (mobile === null) {
			window.innerWidth < divide ? setMobile(true) : setMobile(false)
		} else {
			window.addEventListener('resize', function() {
				window.innerWidth < divide ? setMobile(true) : setMobile(false)
			}, {passive: true})
			if (!mobile) {
				const introduce = '안녕하세요,\n웹 브라우저로 생각을 표현하는 개발자 홍영진입니다.'
				const text = document.querySelector('.text')
				let i = 0
				function typing() {
					let temp = introduce[i++]
					text.innerHTML += temp === '\n' ? '<br />': temp
					if (i > introduce.length) {
						text.textContent = ''
						i = 0
					}
				}
				setInterval(typing, 300)
			}
		}
	})

  	return (
    <>
		<Container className={classes.root}>
			<Grid container>
				<MuiThemeProvider theme={theme}>
					<Grid item xs={12} md={5}>
						{mobile ? (
							<div className={classes.mobileIndexText}>
								안녕하세요,<br />
								웹 브라우저로 생각을
								표현하는<br />
								개발자 <span style={{color: '#218e16'}}>홍영진</span>입니다.
								<div style={{fontSize: '3vw', marginTop: '20px'}}>
									성장하는 개발자가 될 것입니다.
								</div>
							</div>
						) : (
							<div className={classes.indexText}>
								<div className='text'></div>
								{/* 안녕하세요,<br />
								웹 브라우저로 생각을<br />
								표현하는<br />
								개발자 <span style={{color: '#218e16'}}>홍영진</span>입니다.
								<div style={{fontSize: '20px', marginTop: '20px'}}>
									성장하는 개발자가 될 것입니다.
								</div> */}
							</div>
						)}
					</Grid>
					<Grid item xs={12} md={7} className={classes.indexImage}>
						<Box>
							<div>
								{mobile ? (
									<Image src={'/images/con4.png'} width={100} height={80} layout="responsive" quality={60} />
								) : (
									<Image src={'/images/con4.png'} layout="fill" objectFit="contain" quality={60} />
								)}
							</div>
						</Box>
					</Grid>
				</MuiThemeProvider>
				{/* <Button>
					check
				</Button> */}
			</Grid>
		</Container>
    </>
  	)
}

export default Container2