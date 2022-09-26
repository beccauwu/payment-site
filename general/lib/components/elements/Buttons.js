"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationButtons = PaginationButtons;
exports.Submitbtn = void 0;

var _react = require("react");

var _reactBootstrap = require("react-bootstrap");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _uuid = require("uuid");

var _excluded = ["variant", "type"];

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function PaginationButtons(props) {
  var page = props.page,
      pages = props.pages,
      handlePageChange = props.handlePageChange;
  return /*#__PURE__*/React.createElement(_reactBootstrap.ButtonToolbar, {
    className: "justify-content-center",
    "aria-label": "review pagination"
  }, /*#__PURE__*/React.createElement(_reactBootstrap.ButtonGroup, {
    className: "me-2",
    "aria-label": "Backwards"
  }, /*#__PURE__*/React.createElement(_reactBootstrap.Button, {
    variant: "black",
    onClick: function onClick() {
      return handlePageChange(1);
    }
  }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faBackwardFast
  })), /*#__PURE__*/React.createElement(_reactBootstrap.Button, {
    variant: "black",
    onClick: function onClick() {
      return handlePageChange(page - 1);
    }
  }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faStepBackward
  }))), /*#__PURE__*/React.createElement(_reactBootstrap.ButtonGroup, {
    className: "me-2",
    "aria-label": "Page number"
  }, Array(pages + 1).fill().map(function (_, i) {
    return /*#__PURE__*/React.createElement(_reactBootstrap.Button, {
      key: (0, _uuid.v4)(),
      variant: i + 1 === page ? "primary" : "black",
      onClick: function onClick() {
        return handlePageChange(i + 1);
      },
      "aria-label": "Page " + (i + 1),
      active: page === i + 1,
      className: i + 1 === page ? "giBold text-black" : "text-primary"
    }, i + 1);
  })), /*#__PURE__*/React.createElement(_reactBootstrap.ButtonGroup, {
    "aria-label": "Forwards"
  }, /*#__PURE__*/React.createElement(_reactBootstrap.Button, {
    variant: "black",
    onClick: function onClick() {
      return handlePageChange(page + 1);
    }
  }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faStepForward
  })), /*#__PURE__*/React.createElement(_reactBootstrap.Button, {
    variant: "black",
    onClick: function onClick() {
      return handlePageChange(pages);
    }
  }, /*#__PURE__*/React.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faForwardFast
  }))));
}

var Submitbtn = function Submitbtn(props) {
  var variant = props.variant,
      type = props.type,
      other = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/React.createElement(_reactBootstrap.Button, _extends({
    variant: variant || "primary",
    type: type || "submit"
  }, other));
};

exports.Submitbtn = Submitbtn;