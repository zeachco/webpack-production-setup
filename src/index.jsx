import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const Hook = Component => render(
	<AppContainer><Component /></AppContainer>,
	document.querySelector("#root"));

Hook(App);

if (module && module.hot) {
  module.hot.accept('./App', () => {
    console.clear(); // eslint-disable-line no-console
		const HotApp = require('./App').default;
		Hook(HotApp);
	});
}
