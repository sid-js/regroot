import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='flex flex-col items-center'>
    <Header/>
    <Component {...pageProps} />
    </div>
  
  )
}

export default MyApp
