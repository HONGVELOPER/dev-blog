import React, { useState, useRef } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles'; 
import Grid from '@material-ui/core/Grid';
import { Box, Typography, Button, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 15,
        borderRadius: 5,
    },
    thHover: {
        transition: '0.5s',
        "&:hover": {
          color: '#218e16',
          backgroundColor: "#FFF",
        },
      },
}))

function ThumbNail () {

    const classes = useStyles()

    const [currentFile, setCurrentFile] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [image, setImage] = useState(null);


    const chooseImg = () => {
        document.getElementById("btn-upload").click()
    }

    const selectFile = async (event) => {
        setCurrentFile(event.target.files[0])
        setPreviewImg(URL.createObjectURL(event.target.files[0]))
    }

    const thumbNailHandler = async () => {
        const formData = new FormData()
        formData.append('img', currentFile)

        const result = await axios.post('/api/image/uploadFile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (result.status === 200) {
            console.log(result, "result")
        }
    }

    return (
        <>
            <Container>
                
            </Container>
        </>
    )

}

export default ThumbNail;