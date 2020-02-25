import React from 'react';
import PropTypes from 'prop-types';

export default class MyName extends React.Component {
  constructor(props) {
    super();
    this.name = props.myName;
  }

  render() {
    return (
      <div>
        <h1>Hello {this.name}</h1>
        <ul>
          {this.props.favorites.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

MyName.propTypes = {
  myName: PropTypes.string,
  favorites: PropTypes.array
};

MyName.defaultProps = {
  myName: 'Alex',
  favorites: ['pizza', 'puppies', 'warm baths']
};
