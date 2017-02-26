import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

render(<AppContainer><App /></AppContainer>, document.querySelector("#root"));

if (module && module.hot) {
  module.hot.accept('./App', () => {
    console.clear();
    const App = require('./App').default;
    render(<AppContainer><App/></AppContainer>,document.querySelector("#root")
    );
  });
}
