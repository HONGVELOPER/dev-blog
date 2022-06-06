import Header from "../components/index/Header.js";
import IndexContainer from "../components/index/Container.js";
import Skill from "../components/index/Skill.js";
import About from "../components/index/About.js";
import Footer from "../components/index/Footer.js";
import Head from "next/head";
import { useState } from "react";

function Home() {
	const [abLocation, setAbLocation] = useState(null);
	const [skLocation, setSkLocation] = useState(null);

	function abScroll(condition) {
		setAbLocation(condition);
	}

	function skScroll(condition) {
		setSkLocation(condition);
	}

	return (
		<div>
			<Head>
				<meta
					property="og:title"
					content="Welcome to my DEV-HONG blog"
				/>
				<meta
					property="og:description"
					content="성작하는 개발자의 첫 시작으로 블로그를 만들었습니다."
				/>
			</Head>
			<Header toAbout={abScroll} toSkill={skScroll} />
			<IndexContainer />
			<About toAbout={abLocation} scrollChange={abScroll} />
			<Skill toSkill={skLocation} scrollChange={skScroll} />
			<Footer />
		</div>
	);
}

export default Home;
