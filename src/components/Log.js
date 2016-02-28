import {bind, html} from '../util';
import * as AppState from '../state/AppState';

const {ul, li} = html;

const props = () => ({
  numbers: AppState.Numbers.get()
});

const Log = ({numbers}) => (
  ul({key: 'list'}, numbers.map(i =>
    li({key: `item-${i}`}, `Item ${i}`)))
);

export default bind(Log, props);
