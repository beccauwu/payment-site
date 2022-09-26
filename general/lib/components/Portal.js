"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Portal;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Portal(_ref) {
  var children = _ref.children,
      selector = _ref.selector;
  var portal = document.getElementById(selector);
  return /*#__PURE__*/(0, _reactDom.createPortal)(children, portal);
}