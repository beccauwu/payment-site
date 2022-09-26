import React, { Component } from "react";
import { Stack } from "react-bootstrap";
import Context from "../context/Context";
import AuthForms from "./Authforms";
class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      title: "",
      comment: "",
      stars: 0,
      clicked: false,
      visible: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  starOnClick(value) {
    this.setState({
      stars: value,
      clicked: true,
    });
  }
  starsOnMouseEnter(value) {
    !this.state.clicked ? this.setState({ stars: value }) : null;
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      title: this.state.title,
      comment: this.state.comment,
      stars: this.state.stars,
    };
    console.log(data);
    $.ajax({
      url: `http://127.0.0.1:8000/api/products/${this.props.product.id}/reviews/`,
      type: "POST",
      dataType: "application/json",
      headers: {
        Authorization: `Token ${this.context.auth.token}`,
        "X-CSRFToken": getCookie("csrftoken"),
      },
      data: {
        title: this.state.title,
        comment: this.state.comment,
        stars: this.state.stars,
      },
      success: (response) => {
        this.props.addReview(response);
        this.setState({
          title: "",
          comment: "",
          stars: 0,
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  toggleVisible() {
    this.setState({ visible: !this.state.visible });
    this.state.visible && this.ref.current.scrollIntoView();
  }
  render() {
    if (this.context.auth) {
      const filled = !(
        !this.state.title &&
        !this.state.comment &&
        this.state.stars === 0
      );
      return (
        <Form onSubmit={this.handleSubmit} className={this.props.className}>
          <Form.Group controlId="stars">
            <Form.Label>Rating</Form.Label>
            <Stars
              value={this.state.stars}
              clicked={this.state.clicked}
              onClick={(value) => this.starOnClick(value)}
              onMouseEnter={(value) => this.starsOnMouseEnter(value)}
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              name="title"
              type="text"
              placeholder="Enter title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              required
              name="comment"
              as="textarea"
              rows={3}
              placeholder="Enter comment"
              value={this.state.comment}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type={filled ? "submit" : "button"}
            {...(filled ? {} : { disabled: true })}
          >
            Submit
          </Button>
        </Form>
      );
    } else {
      return (
        <Stack gap={2}>
          <div>
            <a
              className="d-inline"
              href="#"
              onClick={() => this.toggleVisible()}
            >
              Login{" "}
            </a>
            <p className="d-inline">to review</p>
          </div>
          <div ref={this.ref}>
            <AuthForms className={this.state.visible ? "d-block" : "d-none"} />
          </div>
        </Stack>
      );
    }
  }
}
ReviewForm.contextType = Context.app;
export default ReviewForm;
