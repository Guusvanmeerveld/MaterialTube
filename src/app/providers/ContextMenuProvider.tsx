import { FC, useCallback, useEffect } from "react";

import { Listbox, ListboxItem, ListboxSection } from "@heroui/listbox";

import useContextMenuStore from "@/hooks/useContextMenuStore";

import { Component } from "@/typings/component";
import {
	ContextMenuAction as ContextMenuActionProps,
	ContextMenuItemType
} from "@/typings/contextMenu";

const ContextMenuActionComponent: FC<{
	item: ContextMenuActionProps;
	hideContextMenu: () => void;
}> = ({ item, hideContextMenu }) => (
	<ListboxItem
		description={item.description}
		href={item.href}
		key={item.key}
		onClick={() => {
			if (item.onClick) {
				item.onClick();
				hideContextMenu();
			}
		}}
		showDivider={item.showDivider}
		startContent={item.icon}
	>
		{item.title}
	</ListboxItem>
);

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

		return (): void => {
			window.removeEventListener("click", hideIfShown);
			window.removeEventListener("scroll", hideIfShown);
		};
	}, [hideIfShown]);

	return (
		<div
			className="bg-background border-small max-w-xs rounded-small border-default-200 absolute z-10"
			style={{
				top: location.y,
				left: location.x,
				display: shouldShow ? "block" : "none"
			}}
		>
			<Listbox aria-label="Context Menu" items={menu}>
				{(item) => {
					switch (item.type) {
						case ContextMenuItemType.Action:
							return (
								<ContextMenuActionComponent
									hideContextMenu={hide}
									item={item}
									key={item.key}
								/>
							);

						case ContextMenuItemType.Category:
							const category = item;

							return (
								<ListboxSection
									key={category.key}
									showDivider={category.showDivider}
									title={category.title}
								>
									{category.items.map((item) => (
										<ListboxItem
											description={item.description}
											href={item.href}
											key={item.key}
											onClick={() => {
												if (item.onClick) {
													item.onClick();
													hide();
												}
											}}
											showDivider={item.showDivider}
											startContent={item.icon}
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

export const ContextMenuProvider: Component = ({ children }) => (
	<>
		{children}
		<Menu />
	</>
);
