'use strict';
import axios from 'axios';

/* **************************************************** */
/* ***** Set Default Global ****** */
const defaultType = 'bacon';

/* ***** Ipsum class ****** */
export default class Ipsum {
  constructor(type = defaultType, paragraph = 2) {
    this.type = type; // type: "dino", "pony", "bacon"
    this.paragraph = paragraph;
    this.data = [];
  }
  /* ***** getters and setters  ****** */

  get ipsumType() {
    return this.type;
  }

  get paragraphNum() {
    return this.paragraph;
  }

  set ipsumType(type) {
    this.type = type;
  }

  set paragraphNum(num) {
    this.paragraph = num;
  }
  get url() {
    switch (this.type) {
      case 'dino':
        return `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=${this.paragraph}`;
      case 'pony':
        return `https://ponyipsum.com/api/?type=all-pony&paras=${this.paragraph}`;
      case 'bacon':
        return `https://baconipsum.com/api/?type=all-meat&paras=${this.paragraph}`;
      default:
        return '';
    }
  }

  /* ***** get method ****** */

  async getIpsum() {
    let url = this.url;
    if (url === '') {
      return '';
    }

    const data = await axios.get(url);
    this.data = data.data;
    if (this.type === 'dino') {
      this.data = this.data[0];
    }
    return this.data;
  }

  formatAsList() {
    if (this.data == [] || !this.data) {
      return '';
    }
    return (
      '<ul>' +
      this.data.reduce((list, item) => list + `<li>${item}</li>`, '') +
      '</ul>'
    );
  }
}
