import Head from "next/Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({children}) {
	return (
		<main>
			<Head>
				<title>GlyphAI Pro</title>
			</Head>
			<div className={'flex-grow'}>
				<Header/>
				<div className={'pt-24 h-[calc(100vh-65px)] overflow-auto'}>
					<div className={'max-w-5xl mx-auto'}>
						<div className={"px-4 lg:px-0"}>
							{children}
						</div>
					</div>
				</div>
			</div>
			<Footer/>
		</main>
	);
}
