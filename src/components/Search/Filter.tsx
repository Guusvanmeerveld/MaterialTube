import { useMemo } from "react";
import { FiFilter as FilterIcon } from "react-icons/fi";

import { Button } from "@heroui/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@heroui/dropdown";

import { SearchType } from "@/client/typings/search/options";

import { Component } from "@/typings/component";

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

	const currentMenuItem = filterMenuItems.find((item) => item.key === filter);

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button
					className="h-full"
					startContent={<FilterIcon className="text-xl" />}
					variant="bordered"
				>
					{currentMenuItem?.label}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Filter search results"
				items={filterMenuItems}
				onSelectionChange={(keys) => {
					const selectedKeys = keys as Set<SearchType>;

					const selectedKey = Array.from(selectedKeys)[0];

					if (!selectedKey) return;

					setFilter(selectedKey);
				}}
				selectedKeys={[filter]}
				selectionMode="single"
			>
				{(item) => <DropdownItem key={item.key}>{item.label}</DropdownItem>}
			</DropdownMenu>
		</Dropdown>
	);
};
