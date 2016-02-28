
import {List} from 'immutable';
import {PropTypes} from 'react';
import DerivableComponent from '../../lib/DerivableComponent';
import html from '../util/html';

import * as AppState from '../state/AppState';

const {div, h3, ul, li} = html;
const {string, instanceOf} = PropTypes;

const source = {
  title: {
    type: string.isRequired
  },
  numbers: {
    type: instanceOf(List).isRequired,
    value: AppState.Numbers.derive(ns => ns.map(n => n * 100))
  }
};

const Experiment = DerivableComponent((probe, props = source) => probe ? props : (
  div({},
    h3({}, props.title),
    ul({}, props.numbers.map(n => li({key: `item${n}`}, `Item: ${n}`)))
  )
));

export default Experiment;
