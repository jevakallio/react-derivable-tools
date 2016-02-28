import bind from '../util/bind';
import html from '../util/html';
import * as AppState from '../state/AppState';
import Home from './Home';
import Item from './Item';
import Experiment from './Experiment';
import router from '../router';

const {div, h1, h3, button} = html;

const renderRoute = (route) => {
  switch(route.get('component')) {
    case 'Home':
      return Home.get();
    case 'Item':
      return Item({id: route.getIn(['props', 'id']).toString()});
    default:
      return h3({style: {color: 'red'}}, 'Page not found');
  }
};


// Example of component that accesses derivables directly
// instead of unpacking in bind
const App = () => {
  const route = AppState.Navigation.get();
  return (
    div({className: 'app'},
      h1({key: 'header'}, route.get('component')),
      renderRoute(route),
      Experiment({title: 'Experimental stuff'}),
    )
  );
};

export default bind(App);
