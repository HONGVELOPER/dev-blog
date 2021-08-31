import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Image from 'next/image';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		// backgroundColor: 'black',
		// minHeight: '93vh',
    padding: 10
	},
	indexText: {
		fontSize: '45px',
		fontWeight: 600,
		paddingTop: '20vh',
		paddingBottom: '11vh',
		color: 'black',
		paddingLeft: '5vw',
	},
	indexImage: {
		// border: '1px solid black',
		position: 'relative',
		maxWidth: '400px',
		top: '4vh',
	}
}))

const Container2 = () => {

  const classes = useStyles()
  const [mobile, setMobile] = useState(null)
  const divide = 800

  useEffect(() => {
    if (mobile === null) {
      window.innerWidth < divide ? setMobile(true) : setMobile(false)
    } else {
      window.addEventListener('resize', function() {
        window.innerWidth < divide ? setMobile(true) : setMobile(false)
      }, {passive: true})
    }
  })

  return (
    <>
			<Container className={classes.root}>
				<Grid container>
					<Grid item xs={12} md={7} className={classes.indexText}>
						<div>
							안녕하세요,<br />
							웹 브라우저로 생각을<br />
							표현하는<br />
							개발자 <span style={{color: '#218e16'}}>홍영진</span>입니다.
							<div style={{fontSize: '20px', marginTop: '20px'}}>
								성장하는 개발자가 될 것입니다.
							</div>
						</div>
					</Grid>
					<Grid item xs={12} md={5} className={classes.indexImage}>
						<Box>
							<div>
								{mobile ? (
									<Image src={'/images/con4.png'} width={100} height={80} layout="responsive" quality={60}/>
								) : (
									<div>
										<Image src={'/images/con4.png'} layout="fill" objectFit="contain" quality={60}/>
									</div>
								)}
							</div>
						</Box>
					</Grid>
					{/* <Button>
						check
					</Button> */}
				</Grid>
			</Container>
    </>
  )
}

export default Container2