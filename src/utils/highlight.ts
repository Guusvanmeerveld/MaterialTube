const itemPatterns: ItemPattern[] = [
	{
		regex: /(?:([0-9]{1,2}):)?([0-9]{1,2}):([0-9]{2})/g,
		convert: (match): Timestamp => {
			const hours = parseInt(match[1]) || 0;
			const minutes = parseInt(match[2]) || 0;
			const seconds = parseInt(match[3]) || 0;

			const duration = hours * 3600 + minutes * 60 + seconds;

			return {
				type: ItemType.Timestamp,
				duration,
				id: Math.random().toString()
			};
		}
	},
	{
		regex:
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
		convert: (match): Link => {
			console.log(match);

			return {
				type: ItemType.Link,
				href: match[0],
				id: Math.random().toString()
			};
		}
	},
	{
		regex: /(\n)|(<br \/>)/g,
		convert: () => ({ type: ItemType.Linebreak, id: Math.random().toString() })
	}
];

interface BaseItem {
	type: ItemType;
	id: string;
}

interface Timestamp extends BaseItem {
	type: ItemType.Timestamp;
	duration: number;
}

interface Tokens extends BaseItem {
	type: ItemType.Tokens;
	content: string;
}

interface Link extends BaseItem {
	type: ItemType.Link;
	href: string;
	text?: string;
}

interface Linebreak extends BaseItem {
	type: ItemType.Linebreak;
}

export enum ItemType {
	Linebreak,
	Link,
	Tokens,
	Timestamp
}

type Item = Timestamp | Link | Tokens | Linebreak;

export interface ItemPattern {
	regex: RegExp;
	convert: (match: RegExpMatchArray) => Item;
}

export const highlight = (
	input: string,
	patterns: ItemPattern[] = itemPatterns
): Item[] => {
	const items: Item[] = [];

	const matches = patterns
		.map((pattern) =>
			Array.from(input.matchAll(pattern.regex)).map((match) => ({
				match,
				pattern
			}))
		)
		.flat()
		.map(({ match, pattern }) => ({
			index: match.index ?? 0,
			length: match[0].length,
			item: pattern.convert(match)
		}))
		.sort((a, b) => a.index - b.index);

	let lastIndex = 0;

	for (const match of matches) {
		if (match.index !== lastIndex) {
			const content = input.substring(lastIndex, match.index);

			items.push({
				type: ItemType.Tokens,
				content,
				id: Math.random().toString()
			});
		}

		items.push(match.item);

		lastIndex = match.index + match.length;
	}

	if (lastIndex < input.length) {
		const content = input.substring(lastIndex);

		items.push({
			type: ItemType.Tokens,
			content,
			id: Math.random().toString()
		});
	}

	return items;
};
