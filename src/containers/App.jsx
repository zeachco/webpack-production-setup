import React from 'react';
import 'styles/theme.scss';
import Counter from 'components/Counter';
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';
import cx from 'classnames';

const Container = ({children, location}) => {
	const activeLink = path => cx({
		btn: true,
		'btn-secondary': true,
		active: location.pathname === path
	});
	return (
		<div>
			<div>
				<Link className={activeLink('/home')} to="/home">Home</Link>
				<Link className={activeLink('/counter')} to="/counter">Counter</Link>
				<Link className={activeLink('/profile')} to="/profile">Profile</Link>
				<Link className={activeLink('/unknow_page')} to="/unknow_page">Inexistant page</Link>
			</div>
			<div>{children}</div>
		</div>
	);
};

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.setState({loading: true});
		axios.get('/api/wtf').then(xhr => {
			this.setState({
				info: xhr.data,
				loading: false
			});
		}).catch(xhr => {
			setTimeout(() => {
				this.setState({
					info: xhr,
					loading: false
				});
			}, 1000)
		});
	}
	render() {
		let error = null;
		if(this.state.loading) error = (<div className="alert alert-warning">Loading...</div>)
		return (
			<div className="jumbotron">
				{error}
				<pre>{JSON.stringify(this.state.info, null, 2)}</pre>
			</div>
		);
	}
}

const Home = () => (
	<div className="jumbotron">
		<h1>Awesome!</h1>
		<ol>
			<li>This project comes with a modifiable version of <a href="https://v4-alpha.getbootstrap.com/">Bootstrap 4</a> css framework</li>
			<li>It supports hot-loading for both CSS and JS transpilations</li>
			<li>It have working sourcemaps for both babel js and sass files</li>
			<li>have an appcache that allows offline access to the app</li>
			<li>It have eslint on build time with webpack</li>
		</ol>
	</div>
);

const CounterPage = () => (
	<div className="jumbotron">
		<h3>State tester</h3>
		<div>
			<Counter />
		</div>
	</div>
);
const NotFound = () => (
	<div className="jumbotron">
		<h1>Oops 404..</h1>
		<p>This page could not be found!</p>
	</div>
);

const App = () => (
	<Router history={browserHistory}>
		<Route path="/" component={Container}>
			<Route path='/home' component={Home} />
			<Route path='/counter' component={CounterPage} />
			<Route path='/profile' component={Profile} />
			<Route path='*' component={NotFound} />
		</Route>
	</Router>
);

export default App;
