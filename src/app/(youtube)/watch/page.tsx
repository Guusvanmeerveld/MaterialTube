import { NextPage } from "next";
import { Suspense } from "react";

import { Watch } from "./Watch";

const Page: NextPage = () => (
	<Suspense>
		<Watch />
	</Suspense>
);

export default Page;
