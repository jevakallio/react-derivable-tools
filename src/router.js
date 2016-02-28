import {Map} from 'immutable';
import {navigate} from './state/AppState';
import {register, getHandler} from './util/routeHandler'

let router = Map();

router = register(router, '', () => navigate('Home'));
router = register(router, '/item/:id', props => navigate('Item', props))

const onhashchange = () => {
  const [handler, props] = getHandler(router, window.location.hash);
  if (handler) {
    handler(props);
  }
}

window.onhashchange = onhashchange
onhashchange();

export default router;
