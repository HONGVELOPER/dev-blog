import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from 'next/link'
import BreadCrumbs from '../../components/breadCrumbs.js';
import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#218e16',
    }
  },
  status: {
    danger: 'orange',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 750,
      md: 1100,
      lg: 1280,
      xl: 1920
    }
  }
})

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  bottom: {
    display: 'block',
    '&:focus': {
      '&:after': {
        content: "''",
        display: 'block',
        width: '60px',
        borderBottom: '3px solid #218e16',
        margin: '10px auto'
      },
    }
  },
  img: {
    objectFit: "fill",
  },
  blogTitle: {
    marginBottom: '20px',
    fontSize: '17px',
    fontWeight: 600,
  },
  blogWriter: {
    fontSize: '10px',
    fontWeight: 200,
  },
  hover: {
    marginBottom: 5,
    "&:hover": {
      opacity: 0.6,
    }
  },
  
}))

const BlogContainer = (props) => {
  // console.log(props, 'props check')
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const focusRef = useRef(null)

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {
    focusRef.current.focus()
  }, [])

  const contentList = props.data.map((content) => (
    <MuiThemeProvider theme={theme} key={content.id}>
      <Grid item xs={12} sm={6} md={4} style={{padding: 20, minWidth: 300}}>
        <Card
          variant="outlined"
          className={classes.card}
          style={{height: '450px', maxWidth: '400px'}}
        >
          <CardActionArea className={classes.hover}>
            <Link href={`blog/${content.id}`}>
              <CardContent style={{padding: 0, height: '250px'}}>
                <img src={`${content.img}`} alt="card index" style={{display: 'block', height: '100%', width: 'auto'}} />
              </CardContent>
            </Link>
          </CardActionArea>
          {/* <Divider variant="middle" /> */}
          <div style={{Height: '200px', padding: '10px'}}>
            <Box className={classes.blogTitle}>
              <div>{content.title}</div>
            </Box>
            <Box style={{height: '110px'}}>
              {content.content}
            </Box>
            <div className={classes.blogWriter}>
              <div>
                <span>written by </span>
                <span style={{fontWeight: 400, fontSize: '12px'}}>{content.writer}</span>
              </div>
              <span>{content.date}</span>
              <span>
                <span>
                  &nbsp;&nbsp;&nbsp;view: 
                </span>
                {/* <span> */}
                {content.view}
                {/* </span> */}
              </span>
            </div>
          </div>
        </Card>
      </Grid>
    </MuiThemeProvider>
  ))

  return (
    <Container>
      <Grid item xs={12} style={{marginTop: 10}}>
        <BreadCrumbs style={{display: 'inlineBlock'}} />
      </Grid>
      <AppBar className={classes.root} position="static" elevation={0} style={{background: 'transparent', marginTop: '2vw'}}>
        <MuiThemeProvider theme={theme}>
          <Tabs
            value={value}
            textColor="primary"
            onChange={handleValueChange}
            TabIndicatorProps={{ style: {
              display: 'none',
            }}}
          >
            <Tab ref={focusRef} label="인기 포스트" {...a11yProps(0)} className={classes.bottom} />
            <Tab label="최신 포스트" {...a11yProps(1)} className={classes.bottom} />
          </Tabs>
        </MuiThemeProvider>
      </AppBar>
      <TabPanel className={classes.tab} value={value} index={0}>
        <Grid container spacing={0} style={{padding: 0}}>
          {contentList}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Container>
  )
}

export default BlogContainer