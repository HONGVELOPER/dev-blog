function Nav(props) {
  
  console.log('Nav', props)

  const lists = []
  let i = 0
  while (i < props.data.length) {
    lists.push(
      <li key={props.data[i].id}>
        <a href={"/content/" + props.data[i].id}
          data-id={props.data[i].id}
          onClick={function(e) {
            e.preventDefault()
            props.onChangePage(e.target.dataset.id)
          }}
        >
          {props.data[i].title}
        </a>
      </li>
    )
    i += 1
  }

  return (
    <nav>
      <ul>
        {/* <li><a href="1.html">HTML</a></li>
        <li><a href="2.html">CSS</a></li>
        <li><a href="3.html">JavaScript</a></li> */}
        {lists}
      </ul>
    </nav> 
  )
}

export default Nav