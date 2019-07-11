import React, {Component} from 'react';
import './Cando.css';

class Cando extends Component {
  render() {
    return (
      <div className="candoComponent">
        <img className="cando-img" src={this.props.img} alt={this.props.alt}/>
        <div className="cando-body">
          {this.props.bodyText}
        </div>
      </div>
    )
  }
}

export default Cando;
