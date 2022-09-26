"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactStripeJs = require("@stripe/react-stripe-js");

var _stripeJs = require("@stripe/stripe-js");

var _App = require("../App");

var _reactBootstrap = require("react-bootstrap");

var _Checkoutform = _interopRequireDefault(require("../forms/Checkoutform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var stripePromise = (0, _stripeJs.loadStripe)("pk_test_51JLry9GYgLaTAwa8rnnrpWENfj5VQobc318CK5EjFgGW0lQj7KxhO4MlfoIc5otmIoJfXlSuavMUj4lebpqrjydm00MTpnjm0d");

function InjectedCheckoutForm(props) {
  return /*#__PURE__*/_react["default"].createElement(_reactStripeJs.ElementsConsumer, null, function (_ref) {
    var stripe = _ref.stripe,
        elements = _ref.elements;
    return /*#__PURE__*/_react["default"].createElement(_Checkoutform["default"], {
      stripe: stripe,
      elements: elements,
      total: props.total
    });
  });
}

var Checkout = /*#__PURE__*/function (_Component) {
  _inherits(Checkout, _Component);

  var _super = _createSuper(Checkout);

  function Checkout(props) {
    var _this;

    _classCallCheck(this, Checkout);

    _this = _super.call(this, props);
    _this.state = {
      clientSecret: null,
      total: null
    };
    return _this;
  }

  _createClass(Checkout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getClientSecret();
    }
  }, {
    key: "getClientSecret",
    value: function getClientSecret() {
      $.ajax({
        url: "http://127.0.0.1:8000/api/shop/checkout/",
        dataType: "json",
        cache: false,
        success: function (data) {
          this.setState({
            clientSecret: data.client_secret,
            total: data.total
          });
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.clientSecret || !this.state.total) {
        return /*#__PURE__*/_react["default"].createElement(App, null, /*#__PURE__*/_react["default"].createElement("p", null, "Loading..."));
      } else {
        var options = {
          clientSecret: this.state.clientSecret,
          appearance: {
            theme: "night",
            variables: {
              colorPrimary: "#DDA6E0",
              colorBackground: "#474747",
              colorText: "#f5a9c7",
              colorDanger: "#F07F7F"
            }
          }
        };
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Accordion, {
          defaultActiveKey: "0",
          className: "justify-content-center col-12 col-sm-10 col-md-8 col-lg-6 p-3 mx-auto"
        }, /*#__PURE__*/_react["default"].createElement(Accordion.Item, {
          eventKey: "0"
        }, /*#__PURE__*/_react["default"].createElement(Accordion.Header, null, "Basket (1/3)"), /*#__PURE__*/_react["default"].createElement(Accordion.Body, null, /*#__PURE__*/_react["default"].createElement(Basket, null))), /*#__PURE__*/_react["default"].createElement(Accordion.Item, {
          eventKey: "2"
        }, /*#__PURE__*/_react["default"].createElement(Accordion.Header, null, "Your Information (2/3)"), /*#__PURE__*/_react["default"].createElement(Accordion.Body, null, /*#__PURE__*/_react["default"].createElement(Basket, null))), /*#__PURE__*/_react["default"].createElement(_reactStripeJs.Elements, {
          options: options,
          stripe: stripePromise
        }, /*#__PURE__*/_react["default"].createElement(InjectedCheckoutForm, {
          total: this.state.total
        }))));
      }
    }
  }]);

  return Checkout;
}(_react.Component);

Checkout.contextType = _App.AppContext;
var _default = Checkout;
exports["default"] = _default;