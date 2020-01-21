'use strict';
import Ipsum from './Ipsum';

export const getDinoList = async () => {
  const ipsum = new Ipsum('dino', 5);
  await ipsum.getIpsum();
  return ipsum.formatAsList();
};

export const setDinoHTML = html => {
  if (document.getElementById('loading') && document.getElementById('dino')) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('dino').style.display = 'block';
    document.getElementById('dino').innerHTML = html;
  }
};

/*  On page load */
getDinoList().then(list => {
  setDinoHTML(list);
});
