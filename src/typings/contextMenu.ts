export interface ContextMenuItem {
	title: string;
	key: string;
	showDivider?: boolean;
	href?: string;
	onClick?: () => unknown;
}
