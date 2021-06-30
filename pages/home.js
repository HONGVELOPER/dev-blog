import AppBar from '../components/index/Header.js'
import IndexContainer from '../components/index/Container.js'

function Home() {

  return (
    <div style={{backgroundColor: "black", height: "100vh", width: "100%"}}>
      <AppBar></AppBar>
      <IndexContainer></IndexContainer>
    </div>
  )
}

export default Home