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
    colorPrimary: {
        backgroundColor: "#EEEEEE",
    },
    bar: {
        borderRadius: 5,
        backgroundColor: "#1A90FF",
    }
}))

function ThumbNail () {

    const classes = useStyles()

    const [currentFile, setCurrentFile] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    // const [, setThFile] = useState(null);
    // const [thFile, setThFile] = useState(null);

    const chooseImg = () => {
        document.getElementById("btn-upload").click()
    }

    const selectFile = (event) => {
        console.log(event, 'event check')
        setCurrentFile(event.target.files[0])
        setPreviewImg(URL.createObjectURL(event.target.files[0]))
    }

    return (
        <>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <div>
                            <h2>
                                Select blog thumbNail image
                            </h2>
                            <div>
                                <input
                                    id="btn-upload" 
                                    name="btn-upload"
                                    type="file"
                                    accept="image/*"
                                    style={{display: 'none'}}
                                    onChange={selectFile}
                                />
                                <Button variant="outlined" onClick={chooseImg} component="span">
                                    Choose Image
                                </Button>
                                <span>
                                    <img src={previewImg} alt=""  height={200} width={300} style={{display: 'inline-block'}} />
                                </span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )

}

export default ThumbNail;