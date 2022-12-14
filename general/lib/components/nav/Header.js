"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _Context = require("../context/Context");

var _Dropdown = _interopRequireDefault(require("../elements/Dropdown"));

var _Portal = _interopRequireDefault(require("../Portal"));

var _Offcanvas = _interopRequireDefault(require("./Offcanvas"));

var _Authforms = _interopRequireDefault(require("../forms/Authforms"));

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

var Header = /*#__PURE__*/function (_Component) {
  _inherits(Header, _Component);

  var _super = _createSuper(Header);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this, props);
    _this.state = {
      show: false
    };
    _this.onShow = _this.handleShow.bind(_assertThisInitialized(_this));
    _this.onHide = _this.handleClose.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Header, [{
    key: "handleLogout",
    value: function handleLogout() {
      var _this2 = this;

      $.ajax({
        url: "http://127.0.0.1:8000/api/auth/logout/",
        type: "POST",
        dataType: "json",
        cache: false,
        success: function success() {
          localStorage.removeItem("auth");

          _this2.context.setAuth(null);
        },
        error: function error(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    }
  }, {
    key: "handleShow",
    value: function handleShow() {
      this.setState({
        show: true
      });
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        show: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar, {
        bg: "dark",
        variant: "dark",
        expand: "lg"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar.Brand, {
        href: "#home",
        className: "ms-2"
      }, "ShopSite"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar.Toggle, {
        "aria-controls": "basic-navbar-nav"
      }), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Navbar.Collapse, {
        id: "basic-navbar-nav"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav, {
        className: "me-auto"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
        href: "/"
      }, "Home"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
        href: "/shop"
      }, "Shop")), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav, null, !this.context.auth ? /*#__PURE__*/_react["default"].createElement(_Dropdown["default"], {
        as: _reactBootstrap.Nav.Item,
        drop: "start",
        id: "auth-dropdown",
        title: "Login"
      }, /*#__PURE__*/_react["default"].createElement(_Authforms["default"], null)) : /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Item, {
        as: "a",
        onClick: function onClick() {
          return _this3.handleLogout();
        }
      }, "Logout")), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav, null, this.context.basketIsLoaded && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Nav.Link, {
        as: "span",
        onClick: this.onShow
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fa-solid fa-basket-shopping"
      }), " Basket", /*#__PURE__*/_react["default"].createElement(Badge, {
        bg: "info"
      }, this.context.basket.length))), /*#__PURE__*/_react["default"].createElement(_Portal["default"], {
        selector: "offcanvas-root"
      }, /*#__PURE__*/_react["default"].createElement(_Offcanvas["default"], {
        show: this.state.show,
        onHide: this.onHide
      }))));
    }
  }]);

  return Header;
}(_react.Component);

Header.contextType = _Context.contexttypes.app;
var _default = Header;
exports["default"] = _default;