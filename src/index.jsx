import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import store from './store';
import { Provider } from 'react-redux';

const Hook = (Component) => render(
	<AppContainer>
		<Provider store={store}>
			<Component />
		</Provider>
	</AppContainer>,
	document.querySelector("#root"));

Hook(App);

// HRM functionality
if (module && module.hot) {
  module.hot.accept('./containers/App', () => {
    console.clear(); // eslint-disable-line no-console
		const HotApp = require('./containers/App').default;
		Hook(HotApp);
	});
}
