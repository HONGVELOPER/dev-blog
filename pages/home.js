import Home from '../components/Home.js'
import Header from '../components/Header2.js'

function Basic() {
  const style = {
    border: "2px solid black"
  }
  
  return (
    <div style={style}>
      <Header style={style}></Header>

      <Home style={style} />
    </div>
  )
}

export default Basic