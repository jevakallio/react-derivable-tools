import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// A root component that handles updating the view
// when state changes
const Main = React.createClass({
  getInitialState() {
    return {
      vdom: this.props.root.get(),
      reactor: this.props.root.reactor(vdom => {
        this.setState({vdom});
      })
    };
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

ReactDOM.render(React.createElement(Main, {root: App}), document.getElementById('root'));
