import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class IpsumLoad extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.loadIpsum = this.loadIpsum.bind(this);
  }
  async loadIpsum(type, paragraphs = 3) {
    let url = `https://baconipsum.com/api/?type=all-meat&paras=${paragraphs}`;
    if (type === 'pony') {
      url = `https://ponyipsum.com/api/?type=all-pony&paras=${paragraphs}`;
    }
    const data = await axios.get(url);
    setTimeout(() => {
      this.setState({
        ipsum: data.data,
        loading: false
      });
      this.props.changeType(type);
    }, 3000);
  }

  render() {
    return (<div>

    </div>);
  }
}

/*
IpsumLoad.propTypes = {
  //useName: PropTypes.string
};

*/
