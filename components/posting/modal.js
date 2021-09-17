import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		width: 600,
		height: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
	},
	modal: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	password: {
		width: 400,
		marginTop: 100,
	}
}))

const modal = (props) => {

	const classes = useStyles()
  	const [open, setOpen] = useState(false)
	const [password, setPassword] = useState('')

	const openHandler = () => {
		setOpen(true)
	}

	const closeHandler = () => {
		setOpen(false)
	}

	const passwordHandler = (e) => {
		setPassword(e.target.value)
	}

	const passwordCheck = async () => {
		const response = await axios.post('/api/blog', {
			password: password,
		})
		if (response.data.result) {
			props.passwordCheck(true)
		} else {
			alert('다시 입력해주세요.')
		}
	}

	return (
		<>
			<Container style={{paddingLeft: 0}}>
				<Button className='modalButton' onClick={openHandler} style={{cursor: 'default'}} />
				<Modal
					open={open}
					onClose={closeHandler}
					className={classes.modal}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				>
					<div className={classes.paper}>
						<div style={{padding: 30}}>
							Enter your Password
						</div>
						<Divider variant="middle" />
						<TextField
							// required
							type="password"
							className={classes.password}
							label="Password Check"
							onChange={passwordHandler}
							defaultValue={password}
						/>
						<div style={{marginTop: 100, display: 'flex', marginLeft: 100, marginRight: 100}}>
							<Button href="/blog">Back</Button>
							<Button style={{marginLeft: 'auto'}} onClick={passwordCheck}>Check</Button>
						</div>
					</div>
				</Modal>
			</Container>
		</>
	)
}

export default modal