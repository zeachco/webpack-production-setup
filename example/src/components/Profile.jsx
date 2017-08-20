import React from 'react';
import {connect} from 'react-redux';
import {loadProfile} from '../store/actions';

export const DEFAULT_PATH = '/api/wtf';

export const PureComponent = props => (
    <div>Hello {props.name}!</div>
);

const Profile = ({
    loading,
    info
}) => (
    <div className="jumbotron">
        <button className="btn btn-primary" onClick={() => loadProfile('api/profile/retry')}>Reload</button>
        {loading ? (<div className="alert alert-warning">Loading...</div>) : null}
        <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
);

const mapStateToProps = state => {
    return {
        loading: state.profile.loading,
        info: state.profile.data
    };
};

export default connect(mapStateToProps)(Profile);
