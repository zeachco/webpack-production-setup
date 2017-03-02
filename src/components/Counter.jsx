import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

const Counter = ({count, increase, decrease}) => (
	<div className="btn-group" role="group" aria-label="Basic example">
		<button className="btn btn-secondary" disabled={ count < 1 } onClick={decrease}>Substract</button>
		<button className="btn" disabled>{count}</button>
		<button className="btn btn-primary" disabled={ count > 14 }onClick={increase}>Increment</button>
	</div>
);

Counter.propTypes = {
	count: PropTypes.number.isRequired,
	increase: PropTypes.func.isRequired,
	decrease: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ count: state.count });

const mapDispatchToProps = (dispatch) => ({
	increase: e => {
		e.preventDefault();
		dispatch(actions.increase());
	},
	decrease: e => {
		e.preventDefault();
		dispatch(actions.decrease());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
