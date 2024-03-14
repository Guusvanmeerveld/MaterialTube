import { Suspense } from "react";
import { Trending } from "./Trending";
import { LoadingPage } from "@/components/LoadingPage";

export default function Page() {
	return (
		<>
			<Suspense fallback={<LoadingPage />}>
				<Trending />
			</Suspense>
		</>
	);
}
