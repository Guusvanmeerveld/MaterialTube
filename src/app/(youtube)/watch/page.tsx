import { NextPage } from "next";
import { Suspense } from "react";

import { Watch } from "./Watch";

const Page: NextPage = () => {
	return (
		<>
			<Suspense>
				<Watch />
			</Suspense>
		</>
	);
};

export default Page;
