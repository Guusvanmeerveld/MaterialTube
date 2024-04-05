import { NextPage } from "next";
import { Suspense } from "react";

import { Container } from "@/components/Container";
import { Search } from "@/components/Search";

import { SearchPage } from "./SearchPage";

const Page: NextPage = () => {
	return (
		<>
			<Suspense
				fallback={
					<Container>
						<Search />
					</Container>
				}
			>
				<SearchPage />
			</Suspense>
		</>
	);
};

export default Page;
