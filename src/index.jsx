import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

let App = require('./containers/App');
let store = require('./store');

const Hook = () => {
	console.clear(); /* eslint no-console: "off" */
	App = require('./containers/App').default;
	store = require('./store').default;
	render(
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>,
	document.querySelector("#root"));}

Hook();

// HRM functionality
if (module && module.hot) {
  module.hot.accept('./containers/App', Hook);
  module.hot.accept('./store', Hook);
}
