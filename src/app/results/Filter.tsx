import { SearchType } from "@/client/typings/search/options";
import { Component } from "@/typings/component";

import { FiFilter as FilterIcon } from "react-icons/fi";

import { Button } from "@nextui-org/button";

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem
} from "@nextui-org/dropdown";
import { useMemo } from "react";

export const Filter: Component<{
	filter: SearchType;
	setFilter: (filter: SearchType) => void;
}> = ({ setFilter, filter }) => {
	const filterMenuItems: { key: SearchType; label: string }[] = useMemo(
		() => [
			{ key: "all", label: "All" },
			{ key: "video", label: "Videos" },
			{ key: "channel", label: "Channels" },
			{ key: "playlist", label: "Playlists" }
		],
		[]
	);

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button className="h-full" variant="bordered" isIconOnly>
					<FilterIcon className="text-xl" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Static Actions"
				items={filterMenuItems}
				selectionMode="single"
				selectedKeys={[filter]}
				onSelectionChange={(keys) => {
					const selectedKeys = keys as Set<SearchType>;

					const selectedKey = Array.from(selectedKeys)[0];

					if (!selectedKey) return;

					setFilter(selectedKey);
				}}
			>
				{(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
			</DropdownMenu>
		</Dropdown>
	);
};
