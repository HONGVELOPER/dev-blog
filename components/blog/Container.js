import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
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
  },
  directionBox: {
    paddingTop: '3vw',
    fontSize: '0.7vw',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  titleBox: {
    // border: '1px solid red',
    marginTop: '2vw',
    fontSize: '1.7vw',
    fontWeight: 50,
  },
  tabBox: {
    marginTop: '2vw',
    // border: '2px solid blue',
    width: 'auto',
  },
  tab: {
    // display: 'flex',
    width: '30vw',
    // border: '1px solid black'
  },
  tabPanel: {
    marginTop: '3vw',
    flexGrow: 1,
  },
  card: {
    height: '23vw',
  }
}))

const BlogContainer = (props) => {
  // console.log(props, 'props check')
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const contentList = props.data.map((content) => (
    <Grid item xs={4} key={content.id}>
      <Card
        variant="outlined"
        className={classes.card}
      >
        <CardActionArea>
          <Link href={`blog/${content.id}`}>
            <CardContent>
              <Image src={'/images/profile.jpg'} width={300} height={200} />
              <Divider />
              {content.title}
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  ))

  return (
    <Container className={classes.root}>
      {/* <Box className={classes.directionBox}>
        <span>Home</span>
        <ArrowRightIcon fontSize="small" />
        <span style={{color: '#218e16'}}>Blog</span>
      </Box> */}
      <BreadCrumbs></BreadCrumbs>
      <Box className={classes.titleBox}>
        <Grid container spacing={2}>
          <Grid item xs={8} style={{marginLeft: '20px'}}>
            개발과 관련된 다양한 이야기들을<br />
            정성을 담아 기록하고 있어요
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={1} style={{fontSize: '1.1vw'}}>
              <Grid item xs={6}>
                발행 포스트<br />
                <span style={{color: '#218e16'}}>
                  <span style={{fontSize: '2vw'}}>{props.data.length}</span>건
                </span>
              </Grid>
              <Grid item xs={6}>
                관련 태그<br />
                <span style={{color: '#218e16'}}>
                  <span style={{fontSize: '2vw'}}>60</span>개
                </span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button href="./blog/post">to post</Button>
      </Box>
      <Box className={classes.tabBox}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth" className={classes.tab} aria-label="simple tabs example"  >
          <Tab label="Posting" {...a11yProps(0)} />
          <Tab label="Series" {...a11yProps(1)} />
          <Tab label="Q&A" {...a11yProps(2)} />
        </Tabs>
        {/* 블로그 포스팅 값 가져오는 곳 아마 DB 연결하면서 수정 봐야 할듯 싶다 */}
        <Box className={classes.tabPanel}>
          <TabPanel value={value} index={0}>  
            <Grid container spacing={2}>
              {contentList}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Series
          </TabPanel>
          <TabPanel value={value} index={2}>
            Q&A
          </TabPanel>
        </Box>
      </Box>
    </Container>
  )
}

export default BlogContainer