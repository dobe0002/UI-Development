import axios from 'axios';
import * as _reduce from 'lodash/reduce';

export default class Ipsum {
  constructor(type = 'bacon', paragraph = 2) {
    this.type = type; // note type should be "hippie", "pony", "bacon"
    this.paragraph = paragraph;
    this.data = [];
  }
  async get() {
    let url = this.getURL();
    if (url === '') {
      return '';
    }

    const data = await axios.get(url);
    this.data = data.data;
    return this.data;
  }

  getURL() {
    switch (this.type) {
      case 'hippie':
        return `http://www.hippieipsum.me/api/v1/get/${this.paragraph}`;
      case 'pony':
        return `https://ponyipsum.com/api/?type=all-pony&paras=${this.paragraph}`;
      case 'bacon':
        return `https://baconipsum.com/api/?type=all-meat&paras=${this.paragraph}`;
      default:
        return '';
    }
  }
  formatAsParagraph(array) {
    if (this.type === 'hippie') {
      array = array.paragraph;
    }
    return _reduce(
      array,
      (html, paragraph) => {
        return html + `<p>${paragraph}</p>`;
      },
      ''
    );
  }
}
//export default Ipsum;
