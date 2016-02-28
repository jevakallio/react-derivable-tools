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
  div({},
    // update state
    button({onClick: AppState.addNumber}, 'Add log entry'),
    button({onClick: AppState.toggleLog},
      logVisible ? 'Hide log' : 'Show log'),
      
    h3({}, `Log entries: ${count}`),

    // a nested derivable component
    logVisible && Log.get()
  )
);

export default bind(Home, props);
