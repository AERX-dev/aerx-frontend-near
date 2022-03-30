module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@chakra-ui/storybook-addon',
    '@storybook/addon-postcss',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  }
}