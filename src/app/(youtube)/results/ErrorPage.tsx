import { FC } from "react";

import { Button } from "@heroui/button";
import { Spacer } from "@heroui/spacer";

export const ErrorPage: FC<{ data: Error; refetch: () => void }> = ({
	data: error,
	refetch
}) => (
	<div className="flex-1 flex items-center justify-center">
		<div className="text-center">
			<h1 className="text-xl">An error occurred loading the search page</h1>
			<h2 className="text-lg">{error.toString()}</h2>
			<Spacer y={2} />
			<Button color="primary" onClick={() => refetch()}>
				Retry
			</Button>
		</div>
	</div>
);
