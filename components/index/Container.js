import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import styles from '../../styles/container.module.css';

const IndexContainer = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
        <div>
          Hi, I`m YoungJin Hong
        </div>
        <div>
          I`m full stack web developer
        </div>
        <Button
          variant="outlined"
          color="secondary"
          style={{
            color: "white",
            marginTop: "20px",
          }}
          href="/"
        >
          Clike here
        </Button>  
      </div>
    </Container>
  )
}

export default IndexContainer