import html from '../html';

const {h1} = html;

// Plain. unbound component
const Item = ({id}) => (
   h1({style: {fontSize: '100px'}}, id)
);

export default Item;
