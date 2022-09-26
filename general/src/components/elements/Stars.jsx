import React, { Component } from 'react';
import { Stack } from "react-bootstrap"

export default class Stars extends Component {
  render() {
    return (
      <Stack direction="horizontal" className="justify-content-center">
        {Array(5)
          .fill()
          .map((_, i) => (
            <i
              className={
                "fa-solid fa-star " +
                (i + 1 <= this.props.value ? "text-warning" : "text-secodary")
              }
              key={uuid.v4()}
              onClick={() => this.props.onClick(i + 1)}
              onMouseEnter={() => this.props.onMouseEnter(i + 1)}
            ></i>
          ))}
      </Stack>
    );
  }
}
