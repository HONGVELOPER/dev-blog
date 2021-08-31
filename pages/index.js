import Header from '../components/index/Header.js'
import IndexContainer from '../components/index/Container.js'
import IndexContainer2 from '../components/index/Container2.js'
import Skill from '../components/index/Skill.js'
import Skill2 from '../components/index/Skill2.js'
import About from '../components/index/About.js'
import Footer from '../components/index/Footer.js'
import { useState } from "react"

function Home() {

  console.log('index rendering')
  
  const [abLocation, setAbLocation] = useState(null)
  const [skLocation, setSkLocation] = useState(null)

  function abScroll(condition) {
    setAbLocation(condition)
  }

  function skScroll(condition) {
    setSkLocation(condition)
  }


  return (
    <div> 
      <Header toAbout={abScroll} toSkill={skScroll} />
      <IndexContainer2 />
      <About toAbout={abLocation} scrollChange={abScroll} />
      <Skill2 toSkill={skLocation} scrollChange={skScroll} />
      <Footer />
    </div>
  )
}

export default Home