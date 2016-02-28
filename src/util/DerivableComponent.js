import React from 'react';
import {struct, unpack} from 'derivable';

export function Property(type) {
  return value => ({value, type});
}

export function DerivableComponent(factory) {
  const definitions = factory(true);
  const propTypes = {};
  const defaults = {};

  Object.keys(definitions).forEach(key => {
    let def = definitions[key];
    if (typeof def === 'function') {
      propTypes[key] = def(null).type;
    } else {
      propTypes[key] = def.type;
      defaults[key] = def.value;
    }
  });

  const bound = struct(defaults);

  const ReactComponent = React.createClass({
    propTypes,
    render() {
      return factory(false, this.props);
    }
  });

  return (props) => <ReactComponent {...bound.get()} {...props} />;
}
