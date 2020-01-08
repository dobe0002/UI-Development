import reduce from 'lodash/reduce';

import { format } from 'date-fns';

export const convertDateToString = date => {
  return format(date, 'MM-dd-yyyy');
};
export const createList = array => {
  return (
    reduce(
      array,
      (html, paragraph) => {
        return html + `<li>${paragraph}</li>`;
      },
      '<ul>'
    ) + '</ul>'
  );
};
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
