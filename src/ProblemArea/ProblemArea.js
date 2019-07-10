import React, {Component} from 'react';
import './ProblemArea.css';

class ProblemArea extends Component {
	render() {
    return (
      <div className="ProblemArea">
        <img className="portalImg" src="portalimghere" alt="Portal"/>
        <div className="prob-sol">
        		<div className="tab">Interested</div> in learning how to write for video games? Let us help you! The developers of this application has realized that there is no easy way to get into this field. Most tools are proprietary, so how is a new writer supposed to learn? We bring you Red Tale! Red Tale aims to provide you with the tools for you to build your narrative designs, all you have to do is bring your creativity.
        </div>
      </div>
    )
  }
}

export default ProblemArea;