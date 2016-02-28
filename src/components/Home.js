import bind from '../util/bind';
import html from '../util/html';
import * as AppState from '../state/AppState';
import Log from './Log';

const {div, h3, button} = html;

// Maps derivable state to props, similarly to redux.
// Adding some TypeScript here would be nice in lieu of using PropTypes
const props = () => ({
  count: AppState.Count.get(),
  logVisible: AppState.LogVisible.get()
});

const Home = ({count, logVisible}) => (
  div({}, [
    // update state
    button({key: 'addButton', onClick: AppState.addNumber}, 'Add log entry'),
    button({key: 'toggleButton', onClick: AppState.toggleLog},
      logVisible ? 'Hide log' : 'Show log'),

    h3({key: 'entryTitle'}, `Log entries: ${count}`),

    // a nested derivable component
    logVisible && Log.get()
  ])
);

export default bind(Home, props);
