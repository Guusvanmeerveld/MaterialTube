import { NextPage } from "next";
import { Suspense } from "react";

import { ChannelPage } from "./ChannelPage";

const Page: NextPage<{ params: { id: string } }> = ({ params }) => {
	return (
		<>
			<Suspense>
				<ChannelPage channelId={params.id} />
			</Suspense>
		</>
	);
};

export default Page;
