import { FC, Fragment } from "react";

import { Link } from "@nextui-org/link";

import formatDuration from "@/utils/formatDuration";
import { Item, ItemType } from "@/utils/highlight";

export const HighlightRenderer: FC<{ highlighted: Item[] }> = ({
	highlighted
}) => {
	return (
		<>
			{highlighted.map((item) => {
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
		</>
	);
};
