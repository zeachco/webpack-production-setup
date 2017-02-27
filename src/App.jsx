import 'styles/theme.scss';
import React from 'react';

const App = () => (
	<div className="jumbotron">
		<h1>Awesome!</h1>
		<ol>
			<li>This project comes with a modifiable version of <a href="https://v4-alpha.getbootstrap.com/">Bootstrap 4</a> css framework</li>
			<li>It supports hot-loading for both CSS and JS transpilations</li>
		</ol>
		<button className="btn btn-primary">A button</button>
		<button className="btn btn-secondary">Another Button</button>
	</div>
);

export default App;
