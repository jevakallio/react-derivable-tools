import {PropTypes} from 'react';
import DerivableComponent from '../../DerivableComponent';
import html from '../html';
import * as AppState from '../state/AppState';
import Log from './Log';

const {div, h3, button} = html;
const source = {
  count: {
    type: PropTypes.number.isRequired,
    value: AppState.Count
  },
  logVisible: {
    type: PropTypes.bool.isRequired,
    value: AppState.LogVisible
  }
};

const Home = DerivableComponent((probe, props = source) => probe ? props : (
  div({},
    // update state
    button({onClick: AppState.addNumber}, 'Add log entry'),
    button({onClick: AppState.toggleLog},
      props.logVisible ? 'Hide log' : 'Show log'),

    h3({}, `Log entries: ${props.count}`),

    // a nested derivable component
    props.logVisible && Log()
  )
));

export default Home;
