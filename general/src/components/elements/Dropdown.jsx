import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <DropdownButton
        variant={
          !this.props.variant
            ? !this.props.as
              ? "Primary"
              : this.props.as == "Button"
              ? "Primary"
              : null
            : this.props.variant
        }
        id={this.props.id}
        as={this.props.as ? this.props.as : "Button"}
        drop={this.props.drop}
        title={this.props.title}
        renderMenuOnMount={
          this.props.renderOnMount ? this.props.renderOnMount : true
        }
        menuVariant="dark"
        onClick={() => this.props.onClick()}
      >
        {this.props.children}
      </DropdownButton>
    );
  }
}
