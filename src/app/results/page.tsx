import { NextPage } from "next";
import { Suspense } from "react";

import { Container } from "@/components/Container";

import { SearchPage } from "./SearchPage";
import { SearchPageHeader } from "./SearchPageHeader";

const Page: NextPage = () => {
	return (
		<>
			<Suspense
				fallback={
					<Container>
						<SearchPageHeader />
					</Container>
				}
			>
				<SearchPage />
			</Suspense>
		</>
	);
};

export default Page;
