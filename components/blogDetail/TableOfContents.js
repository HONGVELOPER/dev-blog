import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	root: {
        position: 'relative',
        bottom: '100px',
        left: '100px',
    },
    fixed: {
        position: 'fixed',
    }
}))


function TableOfContents () {

    const classes = useStyles()

    return (
        <>
            <Container className={classes.root}>
                <div className={classes.fixed}>
                    hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii2
                </div>
            </Container>
        </>
    )

}

export default TableOfContents