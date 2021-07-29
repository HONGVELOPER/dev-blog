import AppBar from '../components/index/Header.js'
import IndexContainer from '../components/index/Container.js'
import Skill from '../components/index/Skill.js'

function Home() {
  return (
    <div> 
      <AppBar></AppBar>
      <IndexContainer></IndexContainer>
      <Skill></Skill>
    </div>
  )
}

export default Home