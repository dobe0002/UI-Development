// Need to include Ipusm class from Ipsum.js
// Need to include  getRandomColor from Formatter.js

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
