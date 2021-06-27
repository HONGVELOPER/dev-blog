import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Control from '../components/control.js'
// import utilStyles from '../styles/utils.module.css'
import Header from '../components/header.js'
import Nav from '../components/Nav.js'
import ReadContent from '../components/ReadContent.js'
import CreateContent from '../components/CreateContent.js'
import UpdateContent from '../components/UpdateContent.js'
import React , { useState }from "react"
// import { Button } from 'react-bootstrap';


function Home() {

  let max_content_id = 3
  const [subject, setSubject] = useState({
    mode: "create",
    selected_content_id: 2,
    title: "WEB",
    sub: "World Wide WEB!",
    welcome: {title: "welcome", desc: "Hello, React Basic!!"},
    contents: [
      {id: 1, title: "HTML", desc: "HMTL is for information"},
      {id: 2, title: "CSS", desc: "CSS is for design"},
      {id: 3, title: "JavaScript", desc: "JavaScript is for interactive"}
    ],
    // max_content_id: contents[contents.length-1].id
  })
  // const [content, setContent] = useState({
  //   contents: [
  //     {id: 1, title: "HTML", desc: "HMTL is for information"},
  //     {id: 2, title: "CSS", desc: "CSS is for design"},
  //     {id: 3, title: "JavaScript", desc: "JavaScript is for interactive"}
  //   ],
  // })

  let _title, _desc, _article = null
  if (subject.mode === "welcome") {
    _title = subject.welcome.title
    _desc = subject.welcome.desc
    _article = <ReadContent title={_title} desc={_desc} />
  } else if (subject.mode === "read") {
    let i = 0
    while (i < subject.contents.length) {
      if (subject.contents[i].id === subject.selected_content_id) {
        _title = subject.contents[i].title
        _desc = subject.contents[i].desc
        break
      }
      i += 1
    }
    _article = <ReadContent title={_title} desc={_desc} />
  } else if (subject.mode === "create") {
    _article = <CreateContent onSubmit={function(_title, _desc) {
      // add content to state.contents
      max_content_id += 1
      console.log(_title, _desc, 'title, desc check')
      const _contents = subject.contents.concat(
        {id: max_content_id, title: _title, desc: _desc}
      )
      setSubject({...subject, contents: _contents})
      console.log(subject, 'content')
    }} />
  } else if (subject.mode === "update") {
    let i = 0
    while (i < subject.contents.length) {
      if (subject.contents[i].id === subject.selected_content_id) {
        _title = subject.contents[i].title
        _desc = subject.contents[i].desc
        break
      }
      i += 1
    }
    _article = <UpdateContent title={_title} desc={_desc} onSubmit={function(_title, _desc) {
      max_content_id += 1
      console.log(_title, _desc, 'title, desc check')
      const _contents = subject.contents.concat(
        {id: max_content_id, title: _title, desc: _desc}
      )
      setSubject({...subject, contents: _contents})
      console.log(subject, 'content')
    }} />
  }

  console.log('app render')
  return (
    <Layout home>
      {/* <Button>Left</Button> */}
      <Header
        title={subject.title}
        sub={subject.sub}
        onChangePage={function() {
          setSubject({...subject, mode: "welcome"})
        }}
      />
      <Nav onChangePage={function(id) {
        console.log(id,'id check')
        setSubject({...subject, mode: "read", selected_content_id: Number(id)})
      }} data={subject.contents} />
      <Control onChangeMode={function(_mode) {
        setSubject({...subject, mode: _mode})
      }}/>
      {_article}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1></h1>
      {/* <section className={utilStyles.headingMd}>
        <p>hello youngjin world</p>
        <p>
          (This is a samle webstie - you'll be building a site like this on {' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>)
        </p>
      </section> */}
    </Layout>
  )
}

export default Home
