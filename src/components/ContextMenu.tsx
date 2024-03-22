import useContextMenuStore from "@/hooks/useContextMenuStore";

import { Component } from "@/typings/component";
import { ContextMenuItem } from "@/typings/contextMenu";

export const ContextMenu: Component<{ menu: ContextMenuItem[] }> = ({
	menu,
	children
}) => {
	const showContextMenu = useContextMenuStore((state) => state.showContextMenu);

	return (
		<div
			onContextMenu={(e) => {
				e.preventDefault();

				showContextMenu(e.pageX, e.pageY, menu);
			}}
		>
			{children}
		</div>
	);
};
