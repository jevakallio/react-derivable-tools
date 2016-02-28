react-derivable
=====================

Utilities for using [DerivableJS](http://ds300.github.io/derivablejs) with React

## Example

Here is a running list of numbers, and a sum that is derived from it:
```js
import {List} from 'immutable';
import {atom} from 'derivable';

// State
const Items = atom(List());
const Sum = Items.derive(items => items.reduce((sum, n) => sum + n, 0));

// Updates
const addItem = () => Items.swap(items => items.push(items.size));
```

Let's write a React app that displays the list and sum, and allows the user to add new numbers to the list. We can do this using `Derivable.Container`. Internally the container uses a Derivable `Reactor` to listen for changes, and `setState` to update the component state and trigger a rerender.

```js
import ReactDOM from 'react-dom';
import {Container} from 'dreact-derivable/lib/index';

// Our root component is just a plan function that derefences one of more Derivables, 
// in this case, `Sum`. When the Sum updates, the app will rerender.
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
```



Finally, let's implement the missing `ItemsView` using `Derivable.Component`. We can provide a schema to a component, specifying a PropTypes and an optional values for each property, keeping the data requirements and validation co-located.

If provided values are Derivables, the component updates automatically when new derivations are computed. Any value can be overridden by passing it as a prop to the component when rendering.

```js
import {List} from 'immutable';
import React, {PropTypes} from 'react';
import {Component} from 'react-derivable/lib/index';

// Schema
const schema = {
  title: {
    type: PropTypes.string
  },
  items: {
    type: PropTypes.instanceOf(List).isRequired,
    value: Items
  }
};

// The renderer is just a function that translates `props` to `vdom`, which the
// exception that if the first parameter `probe` is true, the component must return
// its props instead. This is used by the component factory to introspect the schema.
const ItemsView = Component((probe, props = schema) => probe ? props : (
  <div>
    <h3>{props.title}</h3>
    <ul>
      {props.items.map(i => (
        <li key={`item-${i}`}><span>{`Item: ${i}`}</span></li>
      ))}
    </ul>
  </div>
));
```

That's it!

### Dependencies

* React >= 0.14
* DerivableJS

### Run example code

```
npm install
npm start
open http://localhost:3000
```
