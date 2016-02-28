import bind from '../util/bind';
import html from '../util/html';
import * as AppState from '../state/AppState';

const {a, ul, li} = html;

const props = () => ({
  numbers: AppState.Numbers.get()
});

const Log = ({numbers}) => (
  ul({}, numbers.map(i =>
    li({key: `item-${i}`},
      a({href: `#/item/${i}`}, `Item ${i}`)
    )
  ))
);

export default bind(Log, props);
