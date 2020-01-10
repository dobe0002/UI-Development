import Ipsum from './Ipsum';
import { getRandomColor } from './Formatter';

/* **************************************************** */
/* ***** Set bar color ****** */
document.getElementById('bar').style.backgroundColor = getRandomColor();

/* **************************************************** */
/* ***** Set  text ****** */
let ipsum = new Ipsum();
document.getElementById('textType').innerHTML = ipsum.type;

ipsum.get().then(data => {
  document.getElementById('container').innerHTML = ipsum.formatAsParagraph(
    data
  );
});
