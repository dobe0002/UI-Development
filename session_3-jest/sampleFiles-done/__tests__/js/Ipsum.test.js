import Ipsum from '../../js/Ipsum';
import axios from 'axios';
import baconIpsum from '../../__fixtures__/baconIpsum';
import dinoIpsum from '../../__fixtures__/dinoIpsum';
import ponyIpsum from '../../__fixtures__/ponyIpsum';

describe('Ipsum tests', () => {
  let ipsum = {};
  beforeEach(() => {
    ipsum = new Ipsum();
    axios.reset();
  });

  test('is in an instance of Ipsum', () => {
    expect(ipsum).toBeInstanceOf(Ipsum);
  });

  /*  *** Internal method tests *** */
  test('default type is bacon', () => {
    expect(ipsum.ipsumType).toEqual('bacon');
  });

  test('default paragraph number is 2', () => {
    expect(ipsum.paragraphNum).toEqual(2);
  });

  test('getUrl returns url for dino', () => {
    ipsum.ipsumType = 'dino';
    expect(ipsum.type).toEqual('dino');
    expect(ipsum.url).toEqual(
      'http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=2'
    );
  });

  test('getUrl returns falsy for strange type', () => {
    ipsum.type = 'not a real type';
    expect(ipsum.url).toBeFalsy();
  });

  /*  *** Public methods - Get() *** */
  test('get returns the dino ipsum', done => {
    axios.setData(dinoIpsum);
    ipsum.type = 'dino';
    ipsum.paragraphNum = 3;
    ipsum.getIpsum().then(response => {
      expect(response).toEqual(dinoIpsum[0]);
      expect(axios.getCalls()[0]).toEqual(
        'http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=3'
      );
      done();
    });
  });

  test('get returns the bacon ipsum', async () => {
    axios.setData(baconIpsum);
    ipsum.ipsumType = 'bacon';
    ipsum.paragraphNum = 3;
    let response = await ipsum.getIpsum();
    expect(response).toEqual(baconIpsum);
    expect(axios.getCalls()[0]).toContain('baconipsum');
    expect(axios.getCalls()[0]).toContain('paras=3');
  });
});
