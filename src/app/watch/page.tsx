import { Suspense } from "react";
import { Watch } from "./Watch";

export default function Page() {
	return (
		<>
			<Suspense>
				<Watch />
			</Suspense>
		</>
	);
}
