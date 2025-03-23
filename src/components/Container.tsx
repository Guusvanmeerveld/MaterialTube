import { navHeight } from "./Nav";

import { Component } from "@/typings/component";

export const Container: Component<{ navbarOffset?: boolean }> = ({
	children,
	navbarOffset = true
}) => {
	let height;

	if (navbarOffset) height = `calc(100vh - ${navHeight}px)`;
	else height = "100vh";

	return (
		<div
			className="container mx-auto py-4 px-2 flex flex-col"
			style={{ minHeight: height }}
		>
			{children}
		</div>
	);
};
