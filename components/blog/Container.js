import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link'
import BreadCrumbs from '../../components/index/breadCrumbs.js';
import AppBar from '@material-ui/core/AppBar';
import SpaIcon from '@material-ui/icons/Spa';
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
  card: {
    transition: '0.5s',
    "&:hover": {
      opacity: 0.5,
      transform: 'translateY(-10px)',
    },
  },
  bottom: {
    display: 'block',
    marginLeft: '15px',
    height: '20px',
    '&:hover': {
      transition: '0.5s',
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
    marginTop: '5px',
    marginBottom: '15px',
    fontSize: '24px',
    fontWeight: 600,
    height: '70px',
  },
  blogContent: {
    height: '45px',
    color: '#73716b',
    fontSize: '12px',
  },
  blogWriter: {
    marginTop: '20px',
    fontSize: '10px',
    fontWeight: 200,
  },
}))

const BlogContainer = (props) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const focusRef = useRef(null)

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
  };

  const contentList = props.data.map((content) => (
    <MuiThemeProvider theme={theme} key={content.id}>
      <Grid item xs={12} sm={6} md={4} style={{padding: 10, minWidth: 300}}>
        <Link href={`blog/${content.id}`}>
          <Card
            elevation={5}
            className={classes.card}
            style={{height: '450px', maxWidth: '400px'}}
          > 
            <CardContent style={{padding: 0, height: '250px'}}>
              <img src={`${content.img}`} alt="card index" style={{display: 'block', height: '100%', width: 'auto'}} />
            </CardContent>
            <Divider variant="middle" style={{position: 'relative', top: 7}} />
            <Box style={{padding: '5px'}}>
              <Box className={classes.blogTitle}>
                <div>{content.title}</div>
              </Box>
              <Box className={classes.blogContent}>
                {content.content}
              </Box>
              <Grid container className={classes.blogWriter}>
                <Grid item xs={12} style={{paddingTop: '2px', display: 'block'}}>
                  <SpaIcon />
                  <Box style={{marginLeft: '5px', display: 'inline-block'}}>
                    <div>
                      <span style={{fontWeight: 500, fontSize: '12px'}}>{content.writer}님이 작성함</span>
                    </div>
                    <div style={{fontWeight: 500, fontSize: '12px', bottom: '1px', position: 'relative'}}>
                      {content.date} &nbsp;&nbsp;조회수: <span style={{fontSize: '12px'}}>{content.view}</span>
                    </div>
                  </Box>
                </Grid>
              </Grid> 
            </Box>
          </Card>
        </Link>
      </Grid>
    </MuiThemeProvider>
  ))

  return (
    <Container>
      <Grid item xs={12} style={{marginTop: 10, marginLeft: 30}}>
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
            <Tab ref={focusRef} label="인기 게시물" {...a11yProps(0)} className={classes.bottom} />
            <Tab label="최근 게시물" {...a11yProps(1)} className={classes.bottom} />
          </Tabs>
        </MuiThemeProvider>
      </AppBar>
      <TabPanel className={classes.tab} value={value} index={0}>
        <Grid container spacing={3} style={{padding: 0}}>
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