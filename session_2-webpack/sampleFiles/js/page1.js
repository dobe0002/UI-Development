// Need to include Ipsum class from Ipsum.js
// Need to include createList and getRandomColor from Formatter.js

/* **************************************************** */
/* ***** Set bar color ****** */
Array.from(document.getElementsByClassName('bar')).forEach(bar => {
  bar.style.backgroundColor = getRandomColor();
});

/* **************************************************** */
/* ***** Set Pony paragraph ****** */
let ipsum = new Ipsum('pony');
document.getElementById('textType1').innerHTML = ipsum.type;

ipsum.get().then(data => {
  document.getElementById('container1').innerHTML = ipsum.formatAsParagraph(
    data
  );
});

/* **************************************************** */
/* ***** Set Dino list ****** */
let ipsum2 = new Ipsum('dino', 15);
document.getElementById('textType2').innerHTML = ipsum2.type;

ipsum2.get().then(data => {
  document.getElementById('container2').innerHTML = createList(data);
});

/* **************************************************** */
/* ***** Get defaultType from Ipsum.js ****** */
console.log('Default type setting from page1.js:', defaultType);
