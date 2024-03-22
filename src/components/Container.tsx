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
			style={{ minHeight: height }}
			className="container mx-auto py-4 px-2 flex flex-col"
		>
			{children}
		</div>
	);
};
