import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    }
}))

const AboutContainer = () => {
    const classes = useStyles()

    return (
        <Container>
            <div>hi</div>
        </Container>
    )
}

export default AboutContainer