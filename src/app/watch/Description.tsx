import sanitizeHtml from "sanitize-html";

import { Fragment, useMemo, useState } from "react";
import {
	FiChevronUp as CollapseIcon,
	FiChevronDown as ExpandIcon
} from "react-icons/fi";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

import formatDuration from "@/utils/formatDuration";
import { highlight, ItemType } from "@/utils/highlight";

import { Component } from "@/typings/component";

const shortenedDescriptionLength = 200;

export const Description: Component<{ data: string }> = ({ data }) => {
	const [expandedDescription, setExpandedDescription] = useState(false);

	const sanitizedDescription = useMemo(
		() =>
			sanitizeHtml(data, {
				allowedTags: ["a", "br"],
				allowedAttributes: {
					a: ["href"]
				}
			}),
		[data]
	);

	const descriptionCut = useMemo(
		() =>
			expandedDescription
				? sanitizedDescription
				: sanitizedDescription.substring(0, shortenedDescriptionLength) + "...",
		[sanitizedDescription, expandedDescription]
	);

	const description = useMemo(
		() => highlight(descriptionCut),
		[descriptionCut]
	);

	return (
		<div>
			<h2 className="text-ellipsis overflow-y-hidden">
				{description.map((item) => {
					switch (item.type) {
						case ItemType.Tokens:
							return <Fragment key={item.id}>{item.content}</Fragment>;

						case ItemType.Link:
							return (
								<Link key={item.id} href={item.href}>
									{item.text ?? item.href}
								</Link>
							);

						case ItemType.Timestamp:
							return (
								<Link key={item.id} href="">
									{formatDuration(item.duration * 1000)}
								</Link>
							);

						case ItemType.Linebreak:
							return <br key={item.id} />;
					}
				})}
			</h2>
			<Button
				startContent={expandedDescription ? <CollapseIcon /> : <ExpandIcon />}
				variant="light"
				onClick={() => setExpandedDescription((state) => !state)}
			>
				{expandedDescription ? "Show less" : "Show more"}
			</Button>
		</div>
	);
};
