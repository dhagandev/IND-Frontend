import React, {Component} from 'react';
import './CandoCarousel.css';

import Cando from '../Cando/Cando'

class CandoCarousel extends Component {
  render() {
    return (
      <div className="carouselComponent">
        <Cando
          img="img-here"
          alt="Organize"
          bodyText="Organize your project and chapters."
        />
        <Cando
          img="img-here"
          alt="Branch"
          bodyText="Design branching narratives."
        />
        <Cando
          img="img-here"
          alt="Dialogue"
          bodyText="Create your dialogue."
        />
        <Cando
          img="img-here"
          alt="Characters"
          bodyText="Construct elaborate characters."
        />
        <Cando
          img="img-here"
          alt="Inspiration"
          bodyText="Store your notes and inspiration."
        />
        <Cando
          img="img-here"
          alt="Export"
          bodyText="Export to Word or Google Docs."
        />
      </div>
    )
  }
}

export default CandoCarousel;
