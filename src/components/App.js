import {bind, html} from '../util';
import * as AppState from '../state/AppState';
import Log from './Log';

const {div, h1, h3, button} = html;

// Maps derivable state to props, similarly to redux.
// Adding some TypeScript here would be nice in lieu of using PropTypes
const props = () => ({
  title: 'Derivable/React demo',
  count: AppState.Count.get(),
  logVisible: AppState.LogVisible.get()
});

const App = ({title, count, logVisible}) => (
  div({className: 'app'}, [
    h1({key: 'header'}, title),

    // update state
    button({key: 'addButton', onClick: AppState.addNumber}, 'Add log entry'),
    button({key: 'toggleButton', onClick: AppState.toggleLog},
      logVisible ? 'Hide log' : 'Show log'),

    h3({key: 'entryTitle'}, `Log entries: ${count}`),

    // a nested derivable component
    logVisible && Log.get()
  ])
);

export default bind(App, props);
