import { NextPage } from "next";
import { Suspense } from "react";

import { ChannelPage } from "./ChannelPage";

const Page: NextPage<{ params: Promise<{ id: string }> }> = async ({
	params
}) => (
	<Suspense>
		<ChannelPage channelId={await params.id} />
	</Suspense>
);

export default Page;
