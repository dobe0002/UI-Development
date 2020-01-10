import * as _reduce from 'lodash/reduce';
import { format } from 'date-fns';

/* **************************************************** */
/* ***** convertDateToString function (unused) ****** */
export const convertDateToString = date => {
  return format(date, 'MM-dd-yyyy');
};

/* **************************************************** */
/* ***** createList function  ****** */
export const createList = array => {
  return (
    _reduce(
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
export const getRandomColor = () => {
  var c = '';
  while (c.length < 6) {
    c += Math.random()
      .toString(16)
      .substr(-6)
      .substr(-1);
  }
  return '#' + c;
};
