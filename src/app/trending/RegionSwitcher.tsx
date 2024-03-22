"use client";

import { useRouter } from "next/navigation";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

import { Region } from "@/utils/getRegionCodes";

import { Component } from "@/typings/component";

export const RegionSwitcher: Component<{
	regions: Region[];
	currentRegion: Region | null;
}> = ({ currentRegion, regions }) => {
	const router = useRouter();

	return (
		<Autocomplete
			defaultItems={regions}
			label="Region"
			placeholder="Select your region"
			isClearable={false}
			selectedKey={currentRegion?.code}
			onSelectionChange={(key) => {
				if (typeof key === "string" && key.length != 0)
					return router.push(`/trending?region=${key}`);
			}}
			className="max-w-xs"
		>
			{(item) => (
				<AutocompleteItem key={item.code}>{item.name}</AutocompleteItem>
			)}
		</Autocomplete>
	);
};
