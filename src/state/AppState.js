import {List} from 'immutable';
import {atom} from 'derivable';

// Derivables are CapitalCased

export const Numbers = atom(List());

export const Count = Numbers.derive(ns => ns.size);

export const LogVisible = atom(true);

// updaters are camelCased

export const addNumber = () => {
  Numbers.swap(ns => ns.unshift(ns.size + 1));
};

export const toggleLog = () => {
  LogVisible.swap(value => !value);
};
