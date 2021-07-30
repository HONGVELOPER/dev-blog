import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BreadCrumbs from '../breadCrumbs.js';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	root: {
		// display: 'flex',
	},
	crumble: {
		// paddingTop: '100px',
	},
	title: {
		// fontSize: '30px',
		fontWeight: '100',
	}
}))

function BlogDetailContainer(props)	 {
	console.log(props, 'props check')
	const classes = useStyles()
	const [mobile, setMobile] = useState(null)

	useEffect(() => {
    if (mobile === null) {
      window.innerWidth < 720 ? setMobile(true) : setMobile(false)
    }
    window.addEventListener('resize', function() {
      window.innerWidth < 720 ? setMobile(true) : setMobile(false)
    }, {passive: true})
    // console.log(mobile, 'first')
  })

	return (
		<Container className={classes.root}>
				{mobile ? (
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<div>{props.title}</div>
						</Grid>
					</Grid>
				) : (
					<Grid container direction="column" spacing={2} style={{border: '1px solid red', marginTop: '40px'}}>
						<Grid item xs={12}>
							<BreadCrumbs />
						</Grid>
						<Grid item xs={12}>
							{/* <div className={classes.title}>{props.data.title}</div> */}
							<div className={classes.title}>
								<h1 style={{marginBottom: 0}}>{props.data.title}</h1>
							</div>
							<div style={{marginBottom: '40px'}}>{props.data.date}</div>
						</Grid>
						<Grid item xs={12} style={{display: 'flex', justifyContent: 'center', border: '1px solid blue'}}>
							<Image src={'/images/profile.jpg'} width={300} height={400} />
						</Grid>
						{/* <Grid item xs={12}>{props.data.content}</Grid> */}
						<Grid item xs={12}>
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />
							포스팅 내용 DB에서 가져오는 공간<br />

						</Grid>
						<div>
							<button href="/blog" varaint="transparent">Back</button>
						</div>
					</Grid>
				)}
			
		</Container>
	)
}

export default BlogDetailContainer