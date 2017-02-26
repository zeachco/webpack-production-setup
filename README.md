# webpack-production-setup
a webpack 2 build pipeline focused on production performance and simplicity

## Use this template
```bash
git clone git@github.com:zeachco/webpack-production-setup.git ./my-project
cd my-project
yarn install # or npm install
npm start # dev server
npm run build #creates a production ready build
```

## Or abstract the files from the structure
From your project, run `npm install -D webpack-production-setup` then
in your `webpack.config.js` write
```javascript
module.exports = require('wpps/webpack.config.js');
```
Or  you can mutate the config from here too
```javascript
const wppsConfig = require('wpps/webpack.config.js');
wppsConfig.plugins.push(/* my own plugins */);
wppsConfig.devtool = 'cheap-module-eval-source-map';
module.exports = wppsConfig;
```
