function Control(props) {
  console.log('Control render')
  return (
    <ul>
      <li><a href="/create" onClick={function(e) {
        e.preventDefault()
        props.onChangeMode('create')
      }}>create</a></li>
      <li><a href="/update"onClick={function(e) {
        e.preventDefault()
        props.onChangeMode('update')
      }}>update</a></li>
      <li><input onClick={function(e) {
        e.preventDefault()
        props.onChangeMode('delete')
      }} type="button" value="delete" /></li>
    </ul>
  )
}

export default Control