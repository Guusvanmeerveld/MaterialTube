"use client";

import { Item } from "@/client/typings/item";

import { Video } from "@/components/Video";

import { Component } from "@/typings/component";

export const Related: Component<{ data: Item[] }> = ({ data }) => {
	return (
		<div className="flex flex-col gap-4">
			{data.map((item) => {
				switch (item.type) {
					case "video":
						return <Video key={item.id} data={item} size={25} />;

					default:
						return <></>;
				}
			})}
		</div>
	);
};
