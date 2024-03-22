import { NextPage } from "next";
import { Suspense } from "react";

import { Search } from "./Search";

const Page: NextPage = () => {
	return (
		<>
			<Suspense>
				<Search />
			</Suspense>
		</>
	);
};

export default Page;
