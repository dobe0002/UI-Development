'use strict';
import Ipsum from './Ipsum';

export const getDinoList = async () => {
  const ipsum = new Ipsum('dino', 5);
  await ipsum.getIpsum();
  let dinos = ipsum.formatAsList();

  document.getElementById('loading').style.display = 'none';
  document.getElementById('dino').style.display = 'block';
  document.getElementById('dino').innerHTML = dinos;
};

/*  On page load */
getDinoList();
