
import MainLayoutx from '@/layouts/Mainlayout'
import "@/assets/css-import-all.css"
import "@/assets/style.css";
import "@/assets/loading-spinner.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import LoginComponen from '@/layouts/LoginComponen';
import dynamic from 'next/dynamic';
import { MyProvider } from '@/interface/myContext';



const Admin = dynamic(() => import('@/layouts/Mainlayout'), { ssr: false })
const Login = dynamic(() => import('@/layouts/LoginComponen'), { ssr: false })
export default function App({ Component, pageProps }: AppProps) {



  if (typeof window !== "undefined") {
    if (window.location.pathname.split('/')[1] == "pemilu") {
      return <Component {...pageProps} />
    } else if (window.location.pathname.split('/')[1] == "login.html") {
      console.log('c');
      return <Login>
        <NextNProgress color="#FF0009" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={false} />
        <Component {...pageProps} />
      </Login>


    }
    else {
      return <MyProvider>
        <Admin>
          <NextNProgress color="#FF0009" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={false} />
          <Component {...pageProps} />
        </Admin>
      </MyProvider>
    }

  }
  else {
    return <MyProvider>
      <Admin>
        <NextNProgress color="#FF0009" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={false} />
        <Component {...pageProps} />
      </Admin>
    </MyProvider>

  }
}


