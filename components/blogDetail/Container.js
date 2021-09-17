import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BreadCrumbs from '../index/breadCrumbs.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import router from 'next/router';
import Modal from '../posting/modal';
import parse from 'html-react-parser';
import TableOfContents from './TableOfContents';

const useStyles = makeStyles((theme) => ({
	title: {
		fontWeight: '100',
	},
	img: {
		height: '400px',
		width: '600px',
	}
}))

function BlogDetailContainer(props)	 {
	const classes = useStyles()
	const [mobile, setMobile] = useState(null)
	const [show, setShow] = useState(false)

	function showHandler(showResult) {
		setShow(showResult)
	}

	useEffect(() => {
		const divide = 1000
		if (mobile === null) {
			window.innerWidth < divide ? setMobile(true) : setMobile(false)
		}
			window.addEventListener('resize', function() {
			window.innerWidth < divide ? setMobile(true) : setMobile(false)
		}, {passive: true})
	})

	const deletePost = async () => {
		const response = await axios.delete('/api/blog', {
			params: {
				id: props.data.id
			}
		})
		if (response.status === 200) {
			alert('블로그 포스팅이 정상적으로 삭제되었습니다.')
			router.push('./')
		} else {
			alert('ERROR')
		}
	}

	return (
		<Container className={classes.root}>
			<Grid container spacing={2} style={{marginTop: '0px'}}>
				<Grid item xs={12}>
					<BreadCrumbs />
				</Grid>
				<Grid item xs={12}>
					<div className={classes.title}>
						<h1 style={{marginBottom: 0}}>{props.data.title}</h1>
					</div>
					<div style={{marginTop: '10px', marginBottom: '35px', fontWeight: '100'}}>
						<span>
							{props.data.date}&nbsp;&nbsp; 조회수: {props.data.view}
						</span>
					</div>
				</Grid>
				<Grid item xs={12}>
					{mobile ? (
						<div>
							{parse(props.data.content)}
						</div>
					) : (
						<Grid container>
							<Grid item xs={10}>
								<div>
									{parse(props.data.content)}
								</div>
							</Grid>
							<Grid item xs={2}>
								<TableOfContents />
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
			<div>
				{show ? (
					<>
						<Button	variant="text" onClick={deletePost}>
							delete
						</Button>
					</>
				) : (
					<>
						<Modal passwordCheck={showHandler} />
					</>
				)}
			</div>
		</Container>
	)
}

export default BlogDetailContainer