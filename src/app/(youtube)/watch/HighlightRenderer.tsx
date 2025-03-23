import { FC, Fragment } from "react";

import { Link } from "@heroui/link";

import formatDuration from "@/utils/formatDuration";
import { Item, ItemType } from "@/utils/highlight";

export const HighlightRenderer: FC<{ highlighted: Item[] }> = ({
	highlighted
}) => (
	<>
		{highlighted.map((item) => {
			switch (item.type) {
				case ItemType.Tokens:
					return <Fragment key={item.id}>{item.content}</Fragment>;

				case ItemType.Link:
					return (
						<Link href={item.href} key={item.id}>
							{item.text ?? item.href}
						</Link>
					);

				case ItemType.Timestamp:
					return (
						<Link href="" key={item.id}>
							{formatDuration(item.duration * 1000)}
						</Link>
					);

				case ItemType.Linebreak:
					return <br key={item.id} />;
			}
		})}
	</>
);
