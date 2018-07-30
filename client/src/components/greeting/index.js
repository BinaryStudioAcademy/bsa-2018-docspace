import React, { Component } from 'react';
import * as actions from './logic/greetingActions';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './greeting.css';

class Greeting extends Component {
  componentWillMount() {
    this.props.getGreetingText()
  }

  render() {
    const { text } = this.props;

    return ( 
      <div className={'greeting__root'} >
        <span>{text}</span> 
      </div>
    );
  }
}

Greeting.propTypes = {
  text: PropTypes.string,
  getGreetingText: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    text: state.greeting.text,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGreetingText: () => dispatch(actions.getGreetingText())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Greeting);
