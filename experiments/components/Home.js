import {PropTypes} from 'react';
import DerivableComponent from '../../lib/DerivableComponent';
import html from '../util/html';
import Log from './Log';

import * as AppState from '../state/AppState';

const {div, h3, button} = html;

const schema = {
  count: {
    type: PropTypes.number.isRequired,
    value: AppState.Numbers.derive(ns => ns.size)
  },
  logVisible: {
    type: PropTypes.bool.isRequired,
    value: AppState.LogVisible
  }
};

const Home = DerivableComponent(schema, props => (
  div({},
    button({onClick: AppState.addNumber}, 'Add log entry'),
    button({onClick: AppState.toggleLog},
      props.logVisible ? 'Hide log' : 'Show log'),

    h3({}, `Log entries: ${props.count}`),
    props.logVisible && Log()
  )
));

export default Home;
