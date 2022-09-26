"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Reviews;

var _uuid = require("uuid");

var _Stars = require("./Stars");

var _reactBootstrap = require("react-bootstrap");

var _Placeholder = _interopRequireDefault(require("./Placeholder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Review(props) {
  return /*#__PURE__*/React.createElement(_reactBootstrap.Container, null, /*#__PURE__*/React.createElement(_reactBootstrap.Row, null, /*#__PURE__*/React.createElement(_reactBootstrap.Col, {
    xs: 4
  }, /*#__PURE__*/React.createElement("p", {
    className: "d-inline"
  }, props.review.user), /*#__PURE__*/React.createElement("p", {
    className: "d-inline"
  }, " ", props.review.date))), /*#__PURE__*/React.createElement(_reactBootstrap.Row, null, /*#__PURE__*/React.createElement(_reactBootstrap.Col, {
    xs: 5,
    md: 4
  }, /*#__PURE__*/React.createElement(_Stars.Stars, {
    value: props.review.stars
  })), /*#__PURE__*/React.createElement(_reactBootstrap.Col, {
    xs: 7,
    md: 8,
    className: "text-start"
  }, /*#__PURE__*/React.createElement("p", {
    className: "giBold mb-0"
  }, props.review.title))), /*#__PURE__*/React.createElement(_reactBootstrap.Row, null, /*#__PURE__*/React.createElement(_reactBootstrap.Col, {
    xs: {
      span: 11,
      offset: 1
    },
    md: {
      span: 10,
      offset: 2
    },
    className: "text-start"
  }, /*#__PURE__*/React.createElement("p", null, props.review.comment))));
}

function Reviews(props) {
  console.log(props);
  var reviews = props.reviews;

  if (reviews) {
    return /*#__PURE__*/React.createElement(_reactBootstrap.Stack, {
      gap: 2
    }, reviews.map(function (review) {
      return /*#__PURE__*/React.createElement(Review, {
        key: (0, _uuid.v4)(),
        review: review
      });
    }));
  } else {
    return /*#__PURE__*/React.createElement(_Placeholder["default"], null);
  }
}