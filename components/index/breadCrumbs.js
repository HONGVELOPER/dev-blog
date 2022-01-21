import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
	breadCrumbs: {
		fontSize: '14px',
	},
}))

const breadCrumble = (props) => {
	const classes = useStyles()
	const { asPath } = useRouter()
	const result = asPath.split('/')
	result.shift(0)

	const list = result.map((path) => (
		isNaN(path) ? (
			path === 'blog' ? (
				<Link key={path} href={`/${path}`} style={{color: '#000000'}}>Blog</Link>	
			) : (
				<Link key={path} href={`/${path}`} style={{color: '#000000'}}>{path}</Link>
			)
		) : (
			<Link key={path} href={`/blog/${path}`} style={{color: '#000000'}}>Post</Link>
		)
	))
	list[list.length - 1].props.style.color="#218e16"
	

	return (
		<div>
			<Breadcrumbs className={classes.breadCrumbs} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
				<Link href="/" style={{color: '#000000'}}>
         			 Home
        		</Link>
				{list}
			</Breadcrumbs>
		</div>
	)
}

export default breadCrumble