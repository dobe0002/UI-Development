import Ipsum from './Ipsum';
import { getRandomColor } from './Formatter';

let ipsum = new Ipsum('pony');

document.getElementById('textType').innerHTML = ipsum.type;

document.getElementById('bar').style.backgroundColor = getRandomColor();

ipsum.get().then(data => {
  document.getElementById('pony').innerHTML = ipsum.formatAsParagraph(data);
});
