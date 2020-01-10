// Need to include  lodash (use reduce)
// Need to format from date-fns

/* **************************************************** */
/* ***** convertDateToString function (unused) ****** */
const convertDateToString = date => {
  return dateFns.format(date, 'MM-dd-yyyy');
};

/* **************************************************** */
/* ***** createList function  ****** */
const createList = array => {
  return (
    _.reduce(
      array,
      (html, paragraph) => {
        return html + `<li>${paragraph}</li>`;
      },
      '<ul>'
    ) + '</ul>'
  );
};

/* **************************************************** */
/* ***** getRandomColor function  ****** */
const getRandomColor = () => {
  var c = '';
  while (c.length < 6) {
    c += Math.random()
      .toString(16)
      .substr(-6)
      .substr(-1);
  }
  return '#' + c;
};
