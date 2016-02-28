import React from 'react';
import {struct, unpack} from 'derivable';



export default function DerivableComponent(factory) {
  const definitions = factory(true);
  const propTypes = {};
  const defaults = {};

  Object.keys(definitions).forEach(key => {
    let def = definitions[key];
    if (typeof def === 'function') {
      def = def(null);
    }
    propTypes[key] = def.type;
    if (def.value !== null && typeof def.value !== 'undefined') {
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

// Helper for creating property definitions
//  e.g. Prop(string.isRequired)(defaultValue)
DerivableComponent.Prop = (type) => {
  return value => ({value, type});
}
