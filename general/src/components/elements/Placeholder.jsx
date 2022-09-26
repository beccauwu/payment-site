import React, { Component } from 'react';

export default class Placeholder extends Component {
  render() {
    return (
      <div
        className="product col rounded bg-dark wi-fc mx-3 text-center text-primary p-2"
        aria-hidden="true"
      >
        <div>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
        </div>
      </div>
    );
  }
}
