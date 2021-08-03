import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BreadCrumbs from '../breadCrumbs.js';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import axios from 'axios';
import router from 'next/router'

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

	const deletePost = async () => {
		const response = await axios.delete('/api/blog', {
			params: {
				id: props.data.id
			}
		})
		console.log(response)
		if (response.status === 200) {
				alert('블로그 포스팅이 정상적으로 삭제되었습니다.')
				router.push('./')
		} else {
				alert('ERROR')
		}
	}

	return (
		<Container className={classes.root}>
			<Grid container direction="column" spacing={2} style={{marginTop: '0px'}}>
				<Grid item xs={12}>
					<BreadCrumbs />
				</Grid>
				<Grid item xs={12}>
					<div className={classes.title}>
						<h1 style={{marginBottom: 0}}>{props.data.title}</h1>
					</div>
					<div style={{marginBottom: '40px'}}>
							<span>
								{props.data.date}&nbsp;&nbsp; 조회수: {props.data.view}
							</span>
					</div>
				</Grid>
				<Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
					<Image src={'https://dev-hong-bucket.s3.ap-northeast-2.amazonaws.com/2020-10-16.png'} width={1100} height={500} />
				</Grid>
				<Grid item xs={12}>
					<div dangerouslySetInnerHTML={{__html: props.data.content}} />
				</Grid>
				<div>
					<Button href="/blog" varaint="text">←Back</Button>
				</div>
				<div>
					<Link href={`/blog/update/${props.data.id}`}>
						<Button variant="text">Update</Button>
					</Link>
				</div>
				<div>
				<Button	variant="text" onClick={deletePost}>
					delete
				</Button>
				</div>
			</Grid>
		</Container>
	)
}

export default BlogDetailContainer