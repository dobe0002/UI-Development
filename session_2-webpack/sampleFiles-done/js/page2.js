import Ipsum from './Ipsum';
import { getRandomColor } from './Formatter';

let ipsum = new Ipsum();

document.getElementById('textType').innerHTML = ipsum.type;

document.getElementById('bar').style.backgroundColor = getRandomColor();

ipsum.get().then(data => {
  document.getElementById('bacon').innerHTML = ipsum.formatAsParagraph(data);
});
