import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import axios from 'axios';
import { Button } from 'reactstrap';


export default class LoadIpsum extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ipsum: '',
      loading: false
    };
    this.getIpsum = this.getIpsum.bind(this);
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
  getIpsum(event) {
    this.setState({ loading: true, ipsum: '' });
    this.props.changeType('')
    this.loadIpsum(event.target.id);
  }
  render() {
    return (
      <div>
        {this.state.loading && <Loading />}
        <p>{this.state.ipsum}</p>
        {!this.state.loading && (
          <div>
            <Button color="primary" onClick={this.getIpsum} id='bacon'>
              Give me the bacon
            </Button>
            <Button color="primary" onClick={this.getIpsum} id='pony'>
              Give me the pony
            </Button>
          </div>
        )}
      </div>
    );
  }
}

LoadIpsum.propTypes = {
  changeType: PropTypes.func
};
