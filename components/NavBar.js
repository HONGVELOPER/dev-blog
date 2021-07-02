import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const drawerWidth = 300
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  navBar: {
    width: drawerWidth,
  },
  avatar: {
    width: 150,
    height: 150,
    textAlign: "center",
    marginLeft: 70,
    display: "block",
  },
  button: {
    display: "block",
    textAlign: "left"
  },
  accordion: {
    fontWeight: 500, 
  },
  // Img: {
  //   position: "fixed",
  //   height: "100vh",
  //   width: "100vw",
  //   overflow: "hidden",
  //   zIndex: -1,
  // }
}))

const NavBar = () => {
  const classes = useStyles()
  return (
    <nav className={classes.navBar}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.navBar,
        }}
        anchor="left"
      >
        {/* <div style={{marginBottom: "100px", textAlign: "center"}}>just for navbar</div> */}
        <Avatar src="/images/youngjin.jpg" className={classes.avatar} style={{border: "2px solid black", marginTop: '100px'}} />
        <div style={{textAlign: "center"}}>dev blog.</div>
        <div style={{textAlign: "center", marginTop: "30px"}}>
          <SearchIcon>search section</SearchIcon>
          search section
        </div>
        <div style={{marginTop: "30px"}}>
          <Button className={classes.button}>Home</Button>
          <Button className={classes.button} href="./introduce">Introduction</Button>
          <Button className={classes.button}>Blog</Button>
          <Button className={classes.button}>github</Button>
        </div>
        <Divider style={{margin: "20px"}} />
        {/* <div>under divider</div> */}
        <div>
          <div>
            {/* <Button className={classes.button}>
              Project desc
            </Button> */}
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className={classes.accordion}>PROJECT</div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className={classes.accordion}>Algorithm</div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className={classes.accordion}>WEB</div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                  sit amet blandit leo lobortis eget.
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </Drawer>
    </nav>
  )
}

export default NavBar