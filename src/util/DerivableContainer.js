import React, { Component } from 'react';
import {isDerivable, derivation} from 'derivable';

const DerivableContainer = React.createClass({
  propTypes: {
    component: React.PropTypes.any.isRequired
  },

  getInitialState() {
    const root = this.getRootComponent();
    return {
      vdom: root.get(),
      reactor: root.reactor(vdom => {
        this.setState({vdom});
      })
    };
  },

  getRootComponent() {
    if (isDerivable(this.props.component)) {
      return this.props.component;
    }

    if (typeof this.props.component === 'function') {
      return derivation(() => this.props.component());
    }

    throw new Error('Expected DerivableContainer.component to be either derivable or a function');
  },

  componentWillMount () {
    this.state.reactor.start();
  },

  componentWillUnmount () {
    this.state.reactor.stop();
  },

  render () {
    return this.state.vdom;
  }
});

export default DerivableContainer;
