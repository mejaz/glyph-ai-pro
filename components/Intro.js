import React from 'react';
import {useRouter} from "next/router";

export default function Intro() {
	const router = useRouter()
	return (
		<div className="mb-4 rounded-lg text-center">
			<h1 className="text-2xl font-semibold mb-3">Simplify Data Migration with a Click!</h1>
			<p className="text-gray-600 text-lg mb-4">
				Say goodbye to manual data entry. Our advanced tool empowers you to seamlessly transfer data from Images to
				your database in just one simple click.
			</p>
			<button className="bg-primary-main hover:bg-primary-light text-primary-contrastText py-2 px-4 rounded-lg text-lg focus:outline-none"
							onClick={() => router.push("/upload")}
			>
				Get Started
			</button>
		</div>
	);
}
