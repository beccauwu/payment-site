"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _reactBootstrap = require("react-bootstrap");

var _Stars = _interopRequireDefault(require("../elements/Stars"));

var _Buttons = _interopRequireDefault(require("../elements/Buttons"));

var _Context = _interopRequireDefault(require("../context/Context"));

var _Reviews = _interopRequireDefault(require("./Reviews"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Productmodal = /*#__PURE__*/function (_Component) {
  _inherits(Productmodal, _Component);

  var _super = _createSuper(Productmodal);

  function Productmodal(props) {
    var _this;

    _classCallCheck(this, Productmodal);

    _this = _super.call(this, props);
    _this.state = {
      perPage: 2,
      page: 1,
      pages: 1,
      show: false
    };
    return _this;
  }

  _createClass(Productmodal, [{
    key: "toggleShow",
    value: function toggleShow() {
      this.setState({
        show: !this.state.show
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var page = this.state.page;
      var perPage = this.state.perPage;
      var pages = this.state.pages;
      var reviews;

      if (!this.props.itm) {
        return /*#__PURE__*/React.createElement(_reactBootstrap.Modal, {
          show: this.props.show,
          onHide: this.props.onClose,
          size: "lg",
          "aria-labelledby": "product-modal-title",
          centered: true
        }, /*#__PURE__*/React.createElement(_reactBootstrap.Modal.Header, null, /*#__PURE__*/React.createElement(_reactBootstrap.Modal.Title, {
          id: "product-modal-title"
        }, "Loading...")), /*#__PURE__*/React.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/React.createElement(PlaceHolder, null)));
      } else {
        var itm = this.props.itm;

        if (itm.reviews) {
          if (page === 1) {
            reviews = itm.reviews.slice(0, perPage);
          } else {
            reviews = itm.reviews.slice((page - 1) * perPage, page * perPage);
          }
        } else {
          reviews = null;
        }

        return /*#__PURE__*/React.createElement(_reactBootstrap.Modal, {
          show: this.props.show,
          onHide: this.props.onClose,
          fullscreen: true,
          "aria-labelledby": "product-modal-title"
        }, /*#__PURE__*/React.createElement(_reactBootstrap.Modal.Header, {
          closeButton: true
        }, /*#__PURE__*/React.createElement(_reactBootstrap.Modal.Title, {
          id: "product-modal-title giBold"
        }, itm.prod_name)), /*#__PURE__*/React.createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/React.createElement(_reactBootstrap.Stack, {
          direction: "horizontal",
          gap: 1
        }, /*#__PURE__*/React.createElement("div", {
          className: "h-100"
        }, /*#__PURE__*/React.createElement("span", {
          className: "fa-solid fa-circle-left align-self-center fs-3",
          onClick: function onClick() {
            return itm.index > 0 && _this2.props.switchProduct(itm.index - 1);
          }
        })), /*#__PURE__*/React.createElement(_reactBootstrap.Stack, {
          gap: 2,
          className: "col-md-5 mx-auto text-center"
        }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
          src: itm.img,
          alt: itm.prod_name + "product image",
          className: "rounded-circle",
          width: 200
        })), /*#__PURE__*/React.createElement(_Stars["default"], {
          value: itm.average_rating
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
          className: "mb-0 fs-5"
        }, "\u20AC", itm.price), /*#__PURE__*/React.createElement("p", null, itm.description)), /*#__PURE__*/React.createElement(BasketComponents, {
          id: itm.id,
          amount: itm.quantity
        }), /*#__PURE__*/React.createElement("a", {
          href: "#",
          onClick: function onClick() {
            return _this2.toggleShow();
          }
        }, "Leave a review!"), /*#__PURE__*/React.createElement(ReviewForm, {
          product: itm,
          addReview: function addReview(review) {
            return _this2.props.addReview(review);
          },
          className: this.state.show ? "d-block" : "d-none"
        }), reviews != null && /*#__PURE__*/React.createElement(_reactBootstrap.Stack, {
          gap: 2,
          className: "rounded my-2 border border-3 p-2 border-primary"
        }, /*#__PURE__*/React.createElement(_Reviews["default"], {
          reviews: reviews,
          perPage: perPage
        }), /*#__PURE__*/React.createElement(_Buttons["default"], {
          page: page,
          pages: pages,
          handlePageChange: function handlePageChange(page) {
            return _this2.setState({
              page: page
            });
          }
        }))), /*#__PURE__*/React.createElement("div", {
          className: "h-100",
          onClick: function onClick() {
            return itm.index < itm.out_of && _this2.props.switchProduct(itm.index + 1);
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: "fa-solid fa-circle-right align-self-center fs-3"
        })))));
      }
    }
  }]);

  return Productmodal;
}(_react.Component);

Productmodal.contextType = _Context["default"].app;
var _default = Productmodal;
exports["default"] = _default;