import React, { useState, useEffect } from 'react'
import Header from '../../../components/index/Header.js'
import UpdateContainer from '../../../components/posting/updateContainer.js'
import Modal from '../../../components/posting/modal.js'
import axios from 'axios';


const BlogUpdate = ({data}) => {


	const [show, setShow] = useState(false)

	function showHandler(showResult) {
		setShow(showResult)
	}

	useEffect(() => {
		document.querySelector('.modalButton').click()
	}, [])
	
	return (
		<div>
			{show ? (
				<>
					<Header />
					<UpdateContainer data={data} />	
				</>
			) : (
				<>
					<Modal passwordCheck={showHandler} />
				</>
			)}
		</div>
	)
}


export default BlogUpdate

export async function getServerSideProps(context) {
	const response = await axios.get('https://developerhong.com/api/blog', {
		params: {
			id: context.query.id,
		}
	})
	console.log(response.data[0], 'response check hererere')
	return {
	  props: {
			data: response.data[0],
	  }
	}
}