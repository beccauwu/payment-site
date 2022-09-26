import React, {Component} from 'react';
import { Dots } from "loading-animations-react";

export default class Loading extends Component {
  render() {
    return (
      <BarLoader
        text={"Loading..."}
        bgColor={"#474747"}
        width={"150px"}
        height={"150px"}
        center
      />
    );
  }
}
