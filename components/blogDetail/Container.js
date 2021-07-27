import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BreadCrumbs from '../breadCrumbs.js';

const useStyles = makeStyles((theme) => ({
	breadCrumbs: {
		fontSize: '14px',
	},
	title: {
		fontSize: '30px',
	}
}))

function BlogDetailContainer(props)	 {
	console.log(props, 'props check')
	const classes = useStyles()

	return (
		<Container>
			<BreadCrumbs></BreadCrumbs>
		</Container>
	)
}

export default BlogDetailContainer