import React from 'react';

import LoadIpsum from './LoadIpsum';
import IpsumData from './IpsumData';


export default class Ipsum extends React.Component {
  constructor(props) {
    super();
    this.state = {
      type: ''
    };
    this.changeType = this.changeType.bind(this);
  }

  changeType(type) {
    this.setState({ type });
  }

  render() {
    return (
      <div>
        {this.state.history}
        <IpsumData type={this.state.type}></IpsumData>
        <LoadIpsum changeType={this.changeType}></LoadIpsum>
      </div>
    );
  }
}
