import { makeStyles } from "@material-ui/core";
import AppBar from '../components/index/Header.js'
import PostContainer from '../components/post/Container.js'


function BlogPost() {
	// const classes = useStyles()
	
	return (
		<div>
			<AppBar></AppBar>
			<PostContainer></PostContainer>	
		</div>
	)
}


export default BlogPost