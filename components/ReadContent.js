function ReadContent(props) {
  console.log('Read Content render')
  return (
    <article>
      <h2>{props.title}</h2>
      {props.desc}
    </article>
  )
}



// ShouldComponentUpdate(newPorps, newState) {
//   렌더링을 할지 안할지 개발자의 마음대로 정할 수 있도록 도와주는 함수
//   다음에 찾아보자.
// }

export default ReadContent