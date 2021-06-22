function Subject(props) {
  console.log(props)
  return (
    <header>
      <h1><a href="/">{props.title}</a></h1>
      {props.sub}
    </header>
  )
}

export default Subject