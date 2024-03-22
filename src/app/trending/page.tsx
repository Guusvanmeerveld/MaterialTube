import { Suspense } from "react";

import { LoadingPage } from "@/components/LoadingPage";

import { Trending } from "./Trending";

export default function Page() {
	return (
		<>
			<Suspense fallback={<LoadingPage />}>
				<Trending />
			</Suspense>
		</>
	);
}
