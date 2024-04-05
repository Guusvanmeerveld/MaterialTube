import { SearchModal } from "./SearchModal";

import { Component } from "@/typings/component";

const YoutubeLayout: Component = ({ children }) => {
	return (
		<>
			{children}
			<SearchModal />
		</>
	);
};

export default YoutubeLayout;
