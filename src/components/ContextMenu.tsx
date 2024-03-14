import { Component } from "@/typings/component";
import { Listbox, ListboxItem } from "@nextui-org/listbox";

export interface ContextMenuItem {
	title: string;
	key: string;
	href?: string;
	onClick?: () => any;
}

export const ContextMenu: Component<{ menu: ContextMenuItem[] }> = ({
	menu
}) => {
	return (
		<Listbox aria-label="Context Menu">
			{menu.map((item) => (
				<ListboxItem onClick={item.onClick} key={item.key} href={item.href}>
					{item.title}
				</ListboxItem>
			))}
		</Listbox>
	);
};
