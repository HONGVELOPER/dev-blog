import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Header from '../../components/index/Header.js';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	}
}))

const BlogDetail = () => {
	const classes = useStyles()

	return (
		<div>
			<Header></Header>
			<Container>
				<div>상세페이지</div>
			</Container>
		</div>
	)	
}

export default BlogDetail