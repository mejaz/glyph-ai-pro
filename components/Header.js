import Link from "next/link";

export default function Header() {
	return (
		<div className={"p-2 border-b fixed w-full z-50 bg-white"}>
			<div className={"max-w-5xl mx-auto text-left"}>
				<Link href={"/"}>
					<h1
						className={"inline-block font-caveat text-5xl font-bold text-slate-500"}>
						GlyphAI <span
						className={"text-transparent bg-clip-text bg-gradient-to-r from-[#eab308] to-[#a855f7] pr-4"}>Pro</span>
					</h1>
				</Link>
			</div>
		</div>
	)
}