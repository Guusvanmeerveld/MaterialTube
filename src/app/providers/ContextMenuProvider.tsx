import useContextMenuStore from "@/hooks/useContextMenuStore";
import { Component } from "@/typings/component";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useCallback, useEffect } from "react";

const Menu: Component = () => {
	const shouldShow = useContextMenuStore((state) => state.show);
	const menu = useContextMenuStore((state) => state.items);
	const hide = useContextMenuStore((state) => state.hide);

	const location = useContextMenuStore((state) => state.location);

	const handleClick = useCallback(() => {
		if (shouldShow) hide();
	}, [hide, shouldShow]);

	useEffect(() => {
		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [handleClick]);

	return (
		<div
			style={{
				top: location.y,
				left: location.x,
				display: shouldShow ? "block" : "none"
			}}
			className="bg-background border-small max-w-xs px-1 py-2 rounded-small border-default-200 absolute z-10"
		>
			<Listbox aria-label="Context Menu">
				{menu.map((item) => (
					<ListboxItem
						onClick={() => {
							if (item.onClick) {
								item.onClick();
								hide();
							}
						}}
						showDivider={item.showDivider}
						key={item.key}
						href={item.href}
					>
						{item.title}
					</ListboxItem>
				))}
			</Listbox>
		</div>
	);
};

export const ContextMenuProvider: Component = ({ children }) => {
	return (
		<>
			{children}
			<Menu />
		</>
	);
};
