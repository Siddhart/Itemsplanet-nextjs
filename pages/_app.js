import '../styles/main.css'
import '../styles/index.css'
import '../styles/item.css'
import '../styles/blog.css'
import '../styles/categories.css'

function saveToUser(graphmCMS_ID){
  console.log(graphmCMS_ID)
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} saveToUser={saveToUser}/>
}

export default MyApp