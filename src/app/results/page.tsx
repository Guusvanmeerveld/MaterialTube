import { Suspense } from "react";
import { SearchPage } from "./SearchPage";

export default function Page() {
	return (
		<>
			<Suspense>
				<SearchPage />
			</Suspense>
		</>
	);
}
