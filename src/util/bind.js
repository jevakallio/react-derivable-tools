import {derivation} from 'derivable';
export default (component, selector) => {
  return derivation(() => component(derivation(selector || (() => null)).get()));
}
