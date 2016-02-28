
import {List} from 'immutable';
import {PropTypes} from 'react';
import {DerivableComponent, Property} from '../util/DerivableComponent';
import html from '../util/html';

import * as AppState from '../state/AppState';

const {div, h3, ul, li} = html;
const {string, instanceOf} = PropTypes;

// A component that uses a default properties to define propTypes
// and default values for properties. If any of the defaults are
// Derivables, the component updates automatically when the value
// changes.
//
// In order to get the default values, the component is called once with
// probe=true, and the component should return second `props` argument.
const Experiment = DerivableComponent((probe, props = {
  title: Property(string.isRequired)('Default title'),
  numbers: Property(instanceOf(List).isRequired)(AppState.Numbers)
}) => probe ? props : (

  div({},
    h3({}, props.title),
    ul({}, props.numbers.map(n => li({key: `item${n}`}, `Item: ${n}`)))
  )

));

export default Experiment;
