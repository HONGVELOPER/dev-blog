import AppBar from '../components/Appbar.js'
import IndexContainer from '../components/RealHeader.js'

function Home() {

  return (
    <div style={{backgroundColor: "black", height: "100vh", width: "100%"}}>
      <AppBar></AppBar>
      <IndexContainer></IndexContainer>
    </div>
  )
}

export default Home