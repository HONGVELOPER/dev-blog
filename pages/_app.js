// 전역 css 설정 
// style에 있는 파일도 컴포넌트로 생각하여 사용 가능

import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}