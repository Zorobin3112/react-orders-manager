const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins([
    "babel-plugin-root-import",
    {
        "paths": [
            {
                "rootPathSuffix": "src/view/components",
                "rootPathPrefix": "$components/"
            },
            {
                "rootPathSuffix": "./src/view/assets",
                "rootPathPrefix": "$assets/"
            },
            {
                "rootPathSuffix": "./src/my-redux",
                "rootPathPrefix": "$my-redux/"
            }
        ]
    },
  ])
);