import { useVisibility } from "reactjs-visibility";

import { CircularProgress } from "@heroui/progress";

import { Component } from "@/typings/component";

export const LoadingNextPage: Component<{
	isFetching: boolean;
	onVisible: (visiblity: boolean) => void;
}> = ({ onVisible, isFetching }) => {
	const { ref } = useVisibility({
		onChangeVisibility: onVisible
	});

	return (
		<div className="flex items-center justify-center min-h-10" ref={ref}>
			{isFetching && <CircularProgress aria-label="Loading more items..." />}
		</div>
	);
};
