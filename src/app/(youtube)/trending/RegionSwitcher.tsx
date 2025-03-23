"use client";

import { useRouter } from "next/navigation";

import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import { Region } from "@/utils/getRegionCodes";

import { Component } from "@/typings/component";

export const RegionSwitcher: Component<{
	regions: Region[];
	currentRegion: Region | null;
}> = ({ currentRegion, regions }) => {
	const router = useRouter();

	return (
		<Autocomplete
			className="max-w-xs"
			defaultItems={regions}
			isClearable={false}
			label="Region"
			onSelectionChange={(key) => {
				if (typeof key === "string" && key.length != 0)
					return router.push(`/trending?region=${key}`);
			}}
			placeholder="Select your region"
			selectedKey={currentRegion?.code}
		>
			{(item) => (
				<AutocompleteItem key={item.code}>{item.name}</AutocompleteItem>
			)}
		</Autocomplete>
	);
};
