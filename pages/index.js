import Header from '../components/index/Header.js'
import IndexContainer from '../components/index/Container.js'
import Skill from '../components/index/Skill.js'
import About from '../components/index/About.js'
import { useState } from "react"

function Home() {
  
  const [location, setLocation] = useState(null)

  function scroll(condition) {
    setLocation(condition)
  }

  return (
    <div> 
      <Header scrollChange={scroll} />
      <IndexContainer />
      <Skill toSkill={location} />
      <About />
    </div>
  )

}

export default Home