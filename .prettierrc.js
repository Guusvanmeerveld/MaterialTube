// @ts-check

/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
	trailingComma: "none",
	useTabs: true,
	plugins: ["@ianvs/prettier-plugin-sort-imports"],
	importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
	importOrderTypeScriptVersion: "5.0.0",
	importOrderCaseSensitive: false,
	importOrder: [
		".*s?css$",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"^(next(/.*)?)|(react.*)",
		"",
		"^@(:?mui|heroui)/.*",
		"",
		"^@/hooks/.*",
		"",
		"^@/(client)|(utils)/.*",
		"",
		"^(@/|\\./)components/*",
		"",
		"^\\.?\\./.*",
		"",
		"<TYPES>",
		"",
		"^(@/|\\./)typings/.*"
	]
};
