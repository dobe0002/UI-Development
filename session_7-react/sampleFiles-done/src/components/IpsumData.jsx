import React from 'react';
import PropTypes from 'prop-types';

export default class IpsumData extends React.Component {
  constructor(props) {
    super();

  }

  render() {
    return <div>{this.props.type !== '' && <div style={{ fontWeight: 'bold' }}>Type: {this.props.type}</div>}</div>;
  }
}

IpsumData.propTypes = {
  type: PropTypes.string
};

IpsumData.defaultProps = {
  type: ''
};
