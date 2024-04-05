export interface BaseContextMenuItem {
	type: ContextMenuItemType;
	key: string;
	title: string;
	showDivider?: boolean;
}

export enum ContextMenuItemType {
	Action,
	Category
}

export interface ContextMenuAction extends BaseContextMenuItem {
	type: ContextMenuItemType.Action;
	description?: string;
	href?: string;
	icon?: React.JSX.Element;
	onClick?: () => unknown;
}

export interface ContextMenuCategory extends BaseContextMenuItem {
	type: ContextMenuItemType.Category;
	items: ContextMenuAction[];
}

export type ContextMenuItem = ContextMenuAction | ContextMenuCategory;
