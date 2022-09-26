import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { contexttypes } from "../context/Context";
import Dropdown from "../elements/Dropdown";
import Portal from "../Portal";
import Offcanvas from "./Offcanvas";
import Authforms from "../forms/Authforms";

class Header extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false,
    }
    this.onShow = this.handleShow.bind(this);
    this.onHide = this.handleClose.bind(this);
  }
  handleLogout() {
    $.ajax({
      url: "http://127.0.0.1:8000/api/auth/logout/",
      type: "POST",
      dataType: "json",
      cache: false,
      success: () => {
        localStorage.removeItem("auth");
        this.context.setAuth(null);
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home" className="ms-2">
          ShopSite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
          </Nav>
          <Nav>
            {!this.context.auth ? (
              <Dropdown
                as={Nav.Item}
                drop="start"
                id="auth-dropdown"
                title="Login"
              >
                <Authforms />
              </Dropdown>
            ) : (
              <Nav.Item as="a" onClick={() => this.handleLogout()}>
                Logout
              </Nav.Item>
            )}
          </Nav>
          <Nav>
            {this.context.basketIsLoaded && (
              <Nav.Link as="span" onClick={this.onShow}>
                <i className="fa-solid fa-basket-shopping"></i> Basket
                <Badge bg="info">{this.context.basket.length}</Badge>
              </Nav.Link>
            )}
          </Nav>
          <Portal selector="offcanvas-root">
            <Offcanvas show={this.state.show} onHide={this.onHide} />
          </Portal>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Header.contextType = contexttypes.app;
export default Header;
