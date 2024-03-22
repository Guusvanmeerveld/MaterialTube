import { NextPage } from "next";
import { Suspense } from "react";

import { LoadingPage } from "@/components/LoadingPage";

import { Trending } from "./Trending";

const Page: NextPage = () => {
	return (
		<>
			<Suspense fallback={<LoadingPage />}>
				<Trending />
			</Suspense>
		</>
	);
};

export default Page;
