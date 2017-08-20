import React from 'react';
import { PropTypes } from 'prop-types';
import 'styles/theme.scss';
import Counter from 'components/Counter';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import cx from 'classnames';

import Profile, {PureComponent} from '../components/Profile';
import {loadProfile} from '../store/actions';
loadProfile('/api/anyapi');

const Container = ({pathname, children}) => {
    const activeLink = path => cx({
        btn: true,
        'btn-secondary': true,
        active: pathname === path
    });
    return (
        <div>
            <div>
                <Link className={activeLink('/')} to="/">Home</Link>
                <Link className={activeLink('/counter')} to="/counter">Counter</Link>
                <Link className={activeLink('/profile')} to="/profile">Profile</Link>
                <Link className={activeLink('/unknow_page')} to="/unknow_page">Inexistant page</Link>
            </div>
            <h2>{pathname}</h2>
            <div>{children}</div>
        </div>
    );
};

Container.propTypes = {
    pathname: PropTypes.object
};

const Home = () => (
    <div className="jumbotron">
        <h1>Awesome!</h1>
        <PureComponent name={'Olivier'} />
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

const NotFound = ({location}) => (
    <div className="jumbotron">
        <h1>Oops 404..</h1>
        <p>Page <i>{location.pathname}</i> could not be found!</p>
        <Profile />
        <CounterPage />
        <Home />
    </div>
);

NotFound.propTypes = {
    location: PropTypes.object.isRequired
};

const App = () => (
    <Router>
        <Container>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={CounterPage} />
                <Route path='/profile' component={Profile} />
                <Route component={NotFound} />
            </Switch>
        </Container>
    </Router>
);

export default App;
