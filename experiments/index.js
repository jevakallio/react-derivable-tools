import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import DerivableContainer from './../lib/DerivableContainer';

ReactDOM.render(
  <DerivableContainer component={App} />,
  document.getElementById('root')
);
