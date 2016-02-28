
import {List} from 'immutable';
import {atom} from 'derivable';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Component} from '../lib/index';
import {Container} from '../lib/index';
// State
const Items = atom(List());
const Sum = Items.derive(items => items.reduce((sum, n) => sum + n, 0));

// Updates
const addItem = () => Items.swap(items => items.push(items.size));

// Define types and optional source for data. If values are Derivables,

// The component updates automatically when new derivations are computed
const dataSource = {
  title: {
    type: PropTypes.string
  },
  items: {
    type: PropTypes.instanceOf(List).isRequired,
    value: Items
  }
};

// Simple component
const ItemsView = Component((probe, props = dataSource) => probe ? props : (
  <div>
    <h3>{props.title}</h3>
    <ul>
      {props.items.map(i => (
        <li key={`item-${i}`}><span>{`Item: ${i}`}</span></li>
      ))}
    </ul>
  </div>
));

// Root component - just a plan function that derefences one of more Derivables
const App = () => (
  <div>
    <button onClick={addItem}>Add number</button>
    <span style={{padding: '8px'}}>
      {Sum.get()}
    </span>
    <ItemsView title='Magical Counter'/>
  </div>
);


ReactDOM.render(
  <Container component={App} />,
  document.getElementById('root')
);
