import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
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
      sm: 800,
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
    flexGrow: 1,
    marginTop: '100px',
  },
  card: {
    // height: '45vw',
    // minWidth: '200px',
  },
}))

const BlogContainer = (props) => {
  // console.log(props, 'props check')
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const contentList = props.data.map((content) => (
    <MuiThemeProvider theme={theme} key={content.id}>
      <Grid item xs={12} sm={6} md={4} style={{padding: 20}}>
        <Card
          // variant="outlined"/
          className={classes.card}
          style={{minHeight: '450px'}}
        >
          <CardActionArea>
            <Link href={`blog/${content.id}`}>
              <CardContent>
                <Image src={'/images/profile.jpg'} width={500} height={230} />
                <Divider />
                <Box style={{Height: '220px'}}>
                  <h2>{content.title}</h2>
                </Box>
                <Box>
                  {content.content}
                </Box>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    </MuiThemeProvider>
  ))

  return (
    <Container>
      <Grid item xs={12} style={{marginTop: 40}}>
        <BreadCrumbs />
      </Grid>
      <Button href="./blog/post">to post</Button>
      <AppBar className={classes.root} position="static" elevation={0} style={{background: 'transparent', marginTop: '5vw'}}>
        <MuiThemeProvider theme={theme}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="최신 포스트" {...a11yProps(0)} />
            <Tab label="인기 포스트" {...a11yProps(1)} />
            <Tab label="Tag" {...a11yProps(2)} />
          </Tabs>
        </MuiThemeProvider>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container spacing={0}>
          {contentList}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Container>
  )
}

export default BlogContainer