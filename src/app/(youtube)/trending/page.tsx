import { NextPage } from "next";
import { Suspense } from "react";

import { Container } from "@/components/Container";
import { LoadingPage } from "@/components/LoadingPage";

import { Trending } from "./Trending";

const Page: NextPage = () => {
	return (
		<>
			<Suspense
				fallback={
					<Container>
						<LoadingPage text="Loading trending page" />
					</Container>
				}
			>
				<Trending />
			</Suspense>
		</>
	);
};

export default Page;
