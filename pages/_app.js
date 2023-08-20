import '@/styles/globals.css'
import {Toaster} from 'react-hot-toast';

if (typeof window === 'undefined') {
  // Import and call `initialize` only on the server side
  import('@/database/initialize').then((module) => {
    const initialize = module.default; // Access the default export
    initialize();
  });
}
export default function App({Component, pageProps}) {
	return <>
		<Component {...pageProps} />
		<Toaster/>
	</>
}