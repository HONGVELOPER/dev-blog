import Header from '../../../components/index/Header.js'
import UpdateContainer from '../../../components/posting/updateContainer.js'
import axios from 'axios';


const BlogUpdate = ({data}) => {
	// const classes = useStyles()
	
	return (
		<div>
			<Header />
			<UpdateContainer data={data} />	
		</div>
	)
}


export default BlogUpdate

export async function getServerSideProps(context) {
	const response = await axios.get('http://localhost:3000/api/blog', {
		params: {
			id: context.query.id,
		}
	})
	// console.log(response.data[0], 'response check')
	return {
	  props: {
			data: response.data[0],
	  }
	}
}