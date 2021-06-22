import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Header from '../components/header.js'
import Nav from '../components/nav.js'
import Content from '../components/content.js'
import React , { useState }from "react"

function Home() {

  const [subject, setSubject] = useState({
    mode: "welcome",
    title: "WEB",
    sub: "World Wide WEB!",
    welcome: {title: "welcome", desc: "Hello, React Basic!!"},
    contents: [
      {id: 1, title: "HTML", desc: "HMTL is for information"},
      {id: 2, title: "CSS", desc: "CSS is for design"},
      {id: 3, title: "JavaScript", desc: "JavaScript is for interactive"}
    ]
  })
  

  return (
    <Layout home>
      <Header title={subject.title} sub={subject.sub} />
      {/* <Header title="React" sub="For UI" /> */}
      <Nav data={subject.contents} />
      <Content title="HTML" desc="HTML is HyperText Markup Language" />
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
