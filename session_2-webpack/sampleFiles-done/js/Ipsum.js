import axios from 'axios';
import * as _reduce from 'lodash/reduce';

/* **************************************************** */
/* ***** Set Default Global ****** */
const defaultType = 'bacon';

/* ***** Ipsum class ****** */
export default class Ipsum {
  constructor(type = defaultType, paragraph = 2) {
    console.log('Default type setting from within Ipsum class:', defaultType);
    this.type = type; // type: "dino", "pony", "bacon"
    this.paragraph = paragraph;
    this.data = [];
  }

  /* ***** get method ****** */
  async get() {
    let url = this.getURL();
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

  /* ***** getURL method ****** */
  getURL() {
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

  /* ***** formatAsParagraph method (unused) ****** */
  formatAsParagraph(array) {
    return _reduce(
      array,
      (html, paragraph) => {
        return html + `<p>${paragraph}</p>`;
      },
      ''
    );
  }
}
