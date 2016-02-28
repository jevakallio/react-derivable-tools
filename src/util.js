import React from 'react';
import hyperscript from 'hyperscript-helpers';
import {derivation} from 'derivable';

export const bind = (component, selector) => {
  return derivation(() => component(derivation(selector).get()));
}

export const html = hyperscript(React.createElement);
