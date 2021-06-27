import React, {useState} from "react"

function UpdateContent(props) {
  console.log('Update Content render', props)
  const [data, setData] = useState({
    title: props.title,
    desc: props.desc
  })
  // const [desc, setDesc] = useState({porps.desc})
  return (
    <article>
      <h2>Update</h2>
      <form
        action="/update_process"
        method="post"
        onSubmit={function(e) {
          e.preventDefault()
          // debugger
          props.onSubmit(
            e.target.title.value,
            e.target.desc.value
          )
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={data.title}
            onChange={function(e) {
              console.log(e.target.value)
              // data.content = e.target.value
              setData({...data, title: e.target.value})
            }}
          />
        </p>
        <p>
          <textarea
            name="desc"
            placeholder="description"
            value={data.desc}
            onChange={function(e) {
              setData({...data, desc: e.target.value})
            }}
          >
          </textarea>
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </article>
  )
}

export default UpdateContent
