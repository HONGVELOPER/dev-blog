export default function Content(props) {
  console.log(props)
  return (
    <article>
      <h2>{props.title}</h2>
      {props.desc}
    </article>
  )
}