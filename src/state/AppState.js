import {Map, List} from 'immutable';
import {atom} from 'derivable';

// Derivables are CapitalCased

export const Numbers = atom(List());

export const Count = Numbers.derive(ns => ns.size);

export const LogVisible = atom(true);

export const Navigation = atom(Map({
  component: 'Home',
  props: Map()
}));

// updaters are camelCased

export const navigate = (component, props) => {
  Navigation.set(Map({component, props}));
};

export const addNumber = () => {
  Numbers.swap(ns => ns.unshift(ns.size + 1));
};

export const toggleLog = () => {
  LogVisible.swap(value => !value);
};
