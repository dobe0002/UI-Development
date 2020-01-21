import { getDinoList, setDinoHTML } from '../../js/page1';
import axios from 'axios';
import dinoIpsum from '../../__fixtures__/dinoIpsum';

describe('Ipsum tests', () => {
  test('Check dino', async () => {
    axios.setData(dinoIpsum);
    let dinoList = await getDinoList();
    expect(dinoList).toEqual(
      '<ul><li>Goyocephale</li><li>Haya</li><li>Orosaurus</li></ul>'
    );
  });
  test('HTML is set properly on page load', () => {
    let html = '<ul><li>Goyocephale</li><li>Haya</li><li>Orosaurus</li></ul>';
    document.body.innerHTML = `<div>
        <div id="loading"></div>
        <div id="dino" style="display:none"></div>
       
      </div>`;

    setDinoHTML(html);
    expect(document.getElementById('dino').style.display).not.toBe('none');
    expect(document.getElementById('loading').style.display).toBe('none');
    expect(document.getElementById('dino').innerHTML).toBe(html);
  });
});
