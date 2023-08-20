import React from 'react';
import {useRouter} from "next/router";

export default function Intro() {
	const router = useRouter()
	return (
		<div className="mb-4 rounded-lg text-center h-[calc(100vh-200px)] flex flex-col justify-center items-center">
			<h1 className="text-2xl font-semibold mb-3">Simplify Data Migration with a Click!</h1>
			<div className={"text-gray-600 text-lg mb-4"}>
				<p>Say goodbye to manual data entry.</p>
				<p>Just a click and transfer <b>Tabular data from Images to your database!</b>
				</p>
			</div>
			<button
				className="bg-primary-main hover:bg-primary-light text-primary-contrastText py-2 px-4 rounded-lg text-lg focus:outline-none"
				onClick={() => router.push("/upload")}
			>
				Get Started
			</button>
		</div>
	);
}
