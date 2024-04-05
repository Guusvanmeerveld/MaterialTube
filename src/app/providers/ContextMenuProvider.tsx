import { FC, useCallback, useEffect } from "react";

import { Listbox, ListboxItem, ListboxSection } from "@nextui-org/listbox";

import useContextMenuStore from "@/hooks/useContextMenuStore";

import { Component } from "@/typings/component";
import {
	ContextMenuAction as ContextMenuActionProps,
	ContextMenuItemType
} from "@/typings/contextMenu";

const ContextMenuActionComponent: FC<{
	item: ContextMenuActionProps;
	hideContextMenu: () => void;
}> = ({ item, hideContextMenu }) => {
	return (
		<ListboxItem
			onClick={() => {
				if (item.onClick) {
					item.onClick();
					hideContextMenu();
				}
			}}
			description={item.description}
			startContent={item.icon}
			showDivider={item.showDivider}
			key={item.key}
			href={item.href}
		>
			{item.title}
		</ListboxItem>
	);
};

const Menu: FC = () => {
	const shouldShow = useContextMenuStore((state) => state.show);
	const menu = useContextMenuStore((state) => state.items);
	const hide = useContextMenuStore((state) => state.hide);

	const location = useContextMenuStore((state) => state.location);

	const hideIfShown = useCallback(() => {
		if (shouldShow) hide();
	}, [hide, shouldShow]);

	useEffect(() => {
		window.addEventListener("click", hideIfShown);
		window.addEventListener("scroll", hideIfShown);

		return () => {
			window.removeEventListener("click", hideIfShown);
			window.removeEventListener("scroll", hideIfShown);
		};
	}, [hideIfShown]);

	return (
		<div
			style={{
				top: location.y,
				left: location.x,
				display: shouldShow ? "block" : "none"
			}}
			className="bg-background border-small max-w-xs rounded-small border-default-200 absolute z-10"
		>
			<Listbox aria-label="Context Menu" items={menu}>
				{(item) => {
					switch (item.type) {
						case ContextMenuItemType.Action:
							return (
								<ContextMenuActionComponent
									item={item}
									hideContextMenu={hide}
									key={item.key}
								/>
							);

						case ContextMenuItemType.Category:
							const category = item;
							return (
								<ListboxSection
									title={category.title}
									key={category.key}
									showDivider={category.showDivider}
								>
									{category.items.map((item) => (
										<ListboxItem
											onClick={() => {
												if (item.onClick) {
													item.onClick();
													hide();
												}
											}}
											description={item.description}
											startContent={item.icon}
											showDivider={item.showDivider}
											key={item.key}
											href={item.href}
										>
											{item.title}
										</ListboxItem>
									))}
								</ListboxSection>
							);
					}
				}}
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
