import { create } from "zustand";

import { ContextMenuItem } from "@/typings/contextMenu";

interface Location {
	x: number;
	y: number;
}

interface ContextMenuStore {
	show: boolean;
	location: Location;
	items: ContextMenuItem[];
	showContextMenu: (x: number, y: number, items: ContextMenuItem[]) => void;
	hide: () => void;
}

const useContextMenuStore = create<ContextMenuStore>((set) => ({
	show: false,
	location: { x: 0, y: 0 },
	items: [],
	showContextMenu(x, y, items) {
		set({ show: true, location: { x, y }, items });
	},
	hide: () => set({ show: false })
}));

export default useContextMenuStore;
