import DerivableComponent from '../../lib/DerivableComponent';
import html from '../util/html';
import * as AppState from '../state/AppState';

import {PropTypes} from 'react';
import {List} from 'immutable';
const {a, ul, li} = html;

const schema = {
  numbers: {
    type: PropTypes.instanceOf(List),
    value: AppState.Numbers
  }
};


const Log = DerivableComponent(schema, props => (
  ul({}, props.numbers.map(i =>
    li({key: `item-${i}`},
      a({href: `#/item/${i}`}, `Item ${i}`)
    )
  ))
));

export default Log;
