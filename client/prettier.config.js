module.exports = {
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: true,
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  vueIndentScriptAndStyle: false,
  jsxSortAttributes: true,
  jsxAttributeStringLiteralStyle: 'prefer-double',
  attributeGroups: [
    '^ref$',
    '^className$',
    '^(id|name)$',
    '$DEFAULT',
    '^aria-'
  ],
  plugins: [
    'prettier-plugin-organize-attributes',
    'prettier-plugin-tailwindcss'
  ],
  pluginSearchDirs: ['./node_modules']
}
