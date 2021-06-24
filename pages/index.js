import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Header from '../components/header.js'
import Nav from '../components/nav.js'
import Content from '../components/content.js'
import React , { useState }from "react"

function Home() {

  const [subject, setSubject] = useState({
    mode: "read",
    selected_content_id: 2,
    title: "WEB",
    sub: "World Wide WEB!",
    welcome: {title: "welcome", desc: "Hello, React Basic!!"},
    contents: [
      {id: 1, title: "HTML", desc: "HMTL is for information"},
      {id: 2, title: "CSS", desc: "CSS is for design"},
      {id: 3, title: "JavaScript", desc: "JavaScript is for interactive"}
    ]
  })

  let _title, _desc = null
  if (subject.mode === "welcome") {
    _title = subject.welcome.title
    _desc = subject.welcome.desc
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
  }

  console.log('app render')
  return (
    <Layout home>
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
      <Content title={_title} desc={_desc} />
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>hello youngjin world</p>
        <p>
          (This is a samle webstie - you'll be building a site like this on {' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>)
        </p>
      </section>
    </Layout>
  )
}

export default Home
