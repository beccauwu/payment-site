import React, { Component } from 'react';
import { Form, Stack, Button } from 'react-bootstrap';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      email: "",
      error: null,
      visible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };
    const logindata = {
      username: this.state.username,
      password: this.state.password,
    };
    $.ajax({
      url: "http://127.0.0.1:8000/api/auth/register/",
      type: "POST",
      data: data,
      dataType: "json",
      cache: false,
      success: () => {
        this.handleLogin(logindata);
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }
  handleLogin(data) {
    $.ajax({
      url: "http://127.0.0.1:8000/api/auth/login/",
      type: "POST",
      data: data,
      dataType: "json",
      cache: false,
      success: function (data) {
        localStorage.setItem("auth", JSON.stringify(data));
        this.setState({
          username: "",
          password: "",
          password2: "",
          email: "",
        });
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <Form
        className={"py-4 px-3 " + this.props.className}
        ref={this.props.ref}
      >
        <Stack gap={2}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="email"
              type="text"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword2">
            <Form.Label>Confir Password</Form.Label>
            <Form.Control
              name="password2"
              type="password"
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Register
          </Button>
          <Button as="a" onClick={() => this.props.onClick()}>
            Already have an account?
          </Button>
        </Stack>
      </Form>
    );
  }
}
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: null,
      visible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    $.ajax({
      url: "http://127.0.0.1:8000/api/auth/login/",
      type: "POST",
      data: data,
      dataType: "json",
      cache: false,
      success: function (data) {
        localStorage.setItem("auth", JSON.stringify(data));
        this.setState({
          username: "",
          password: "",
        });
      },
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <Form
        className={"py-4 px-3 " + this.props.className}
        ref={this.props.ref}
      >
        <Stack gap={2}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Login
          </Button>
          <Button as="a" onClick={() => this.props.onClick()}>
            Don't have an account?
          </Button>
        </Stack>
      </Form>
    );
  }
}

export default class AuthForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 0,
    };
    this.handleChange = this.handleFormChange.bind(this);
  }
  handleFormChange() {
    this.state.form == 0
      ? this.setState({ form: 1 })
      : this.setState({ form: 0 });
  }
  render() {
    return (
      <div>
        {this.state.form == 0 ? (
          <LoginForm
            className={this.props.className}
            onClick={this.handleChange}
          />
        ) : (
          <RegisterForm
            className={this.props.className}
            onClick={this.handleChange}
          />
        )}
      </div>
    );
  }
}
