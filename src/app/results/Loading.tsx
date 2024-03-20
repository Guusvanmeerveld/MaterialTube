import { Component } from "@/typings/component";
import { CircularProgress } from "@nextui-org/progress";
import { useVisibility } from "reactjs-visibility";

export const Loading: Component<{
	isFetching: boolean;
	onVisible: (visiblity: boolean) => void;
}> = ({ onVisible, isFetching }) => {
	const { ref } = useVisibility({
		onChangeVisibility: onVisible
	});

	return (
		<div ref={ref} className="flex items-center justify-center min-h-10">
			{isFetching && <CircularProgress aria-label="Loading more items..." />}
		</div>
	);
};
