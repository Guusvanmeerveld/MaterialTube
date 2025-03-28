import sanitizeHtml from "sanitize-html";

import { useMemo, useState } from "react";
import {
	FiChevronUp as CollapseIcon,
	FiChevronDown as ExpandIcon
} from "react-icons/fi";

import { Button } from "@heroui/button";

import { highlight } from "@/utils/highlight";

import { HighlightRenderer } from "./HighlightRenderer";

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

	const descriptionAlreadyShort =
		sanitizedDescription.length <= shortenedDescriptionLength;

	const descriptionCut = useMemo(() => {
		if (descriptionAlreadyShort || expandedDescription)
			return sanitizedDescription;
		else
			return (
				sanitizedDescription.substring(0, shortenedDescriptionLength) + "..."
			);
	}, [sanitizedDescription, descriptionAlreadyShort, expandedDescription]);

	const description = useMemo(
		() => highlight(descriptionCut),
		[descriptionCut]
	);

	return (
		<div>
			<h2 className="text-ellipsis overflow-y-hidden">
				<HighlightRenderer highlighted={description} />
			</h2>
			{!descriptionAlreadyShort && (
				<Button
					onClick={() => setExpandedDescription((state) => !state)}
					startContent={expandedDescription ? <CollapseIcon /> : <ExpandIcon />}
					variant="light"
				>
					{expandedDescription ? "Show less" : "Show more"}
				</Button>
			)}
		</div>
	);
};
