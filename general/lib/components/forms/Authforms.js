"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var RegisterForm = /*#__PURE__*/function (_Component) {
  _inherits(RegisterForm, _Component);

  var _super = _createSuper(RegisterForm);

  function RegisterForm(props) {
    var _this;

    _classCallCheck(this, RegisterForm);

    _this = _super.call(this, props);
    _this.state = {
      username: "",
      password: "",
      password2: "",
      email: "",
      error: null,
      visible: false
    };
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RegisterForm, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      var data = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      };
      var logindata = {
        username: this.state.username,
        password: this.state.password
      };
      $.ajax({
        url: "http://127.0.0.1:8000/api/auth/register/",
        type: "POST",
        data: data,
        dataType: "json",
        cache: false,
        success: function success() {
          _this2.handleLogin(logindata);
        },
        error: function error(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    }
  }, {
    key: "handleLogin",
    value: function handleLogin(data) {
      $.ajax({
        url: "http://127.0.0.1:8000/api/auth/login/",
        type: "POST",
        data: data,
        dataType: "json",
        cache: false,
        success: function success(data) {
          localStorage.setItem("auth", JSON.stringify(data));
          this.setState({
            username: "",
            password: "",
            password2: "",
            email: ""
          });
        },
        error: function error(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState(_defineProperty({}, event.target.name, event.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form, {
        className: "py-4 px-3 " + this.props.className,
        ref: this.props.ref
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Stack, {
        gap: 2
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
        controlId: "formBasicEmail"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Username"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
        name: "email",
        type: "text",
        placeholder: "Email",
        onChange: this.handleChange
      })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
        controlId: "formBasicUsername"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Username"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
        name: "username",
        type: "text",
        placeholder: "Username",
        onChange: this.handleChange
      })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
        controlId: "formBasicPassword"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Password"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
        name: "password",
        type: "password",
        placeholder: "Password",
        onChange: this.handleChange
      })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
        controlId: "formBasicPassword2"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Confir Password"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
        name: "password2",
        type: "password",
        placeholder: "Confirm Password",
        onChange: this.handleChange
      })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        variant: "primary",
        type: "submit",
        onClick: this.handleSubmit
      }, "Register"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        as: "a",
        onClick: function onClick() {
          return _this3.props.onClick();
        }
      }, "Already have an account?")));
    }
  }]);

  return RegisterForm;
}(_react.Component);

var LoginForm = /*#__PURE__*/function (_Component2) {
  _inherits(LoginForm, _Component2);

  var _super2 = _createSuper(LoginForm);

  function LoginForm(props) {
    var _this4;

    _classCallCheck(this, LoginForm);

    _this4 = _super2.call(this, props);
    _this4.state = {
      username: "",
      password: "",
      error: null,
      visible: false
    };
    _this4.handleSubmit = _this4.handleSubmit.bind(_assertThisInitialized(_this4));
    _this4.handleChange = _this4.handleChange.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(LoginForm, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var data = {
        username: this.state.username,
        password: this.state.password
      };
      $.ajax({
        url: "http://127.0.0.1:8000/api/auth/login/",
        type: "POST",
        data: data,
        dataType: "json",
        cache: false,
        success: function success(data) {
          localStorage.setItem("auth", JSON.stringify(data));
          this.setState({
            username: "",
            password: ""
          });
        },
        error: function error(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState(_defineProperty({}, event.target.name, event.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form, {
        className: "py-4 px-3 " + this.props.className,
        ref: this.props.ref
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Stack, {
        gap: 2
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
        controlId: "formBasicEmail"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Username"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
        name: "username",
        type: "text",
        placeholder: "Username",
        onChange: this.handleChange
      })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
        controlId: "formBasicPassword"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Password"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
        name: "password",
        type: "password",
        placeholder: "Password",
        onChange: this.handleChange
      })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        variant: "primary",
        type: "submit",
        onClick: this.handleSubmit
      }, "Login"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        as: "a",
        onClick: function onClick() {
          return _this5.props.onClick();
        }
      }, "Don't have an account?")));
    }
  }]);

  return LoginForm;
}(_react.Component);

var AuthForms = /*#__PURE__*/function (_Component3) {
  _inherits(AuthForms, _Component3);

  var _super3 = _createSuper(AuthForms);

  function AuthForms(props) {
    var _this6;

    _classCallCheck(this, AuthForms);

    _this6 = _super3.call(this, props);
    _this6.state = {
      form: 0
    };
    _this6.handleChange = _this6.handleFormChange.bind(_assertThisInitialized(_this6));
    return _this6;
  }

  _createClass(AuthForms, [{
    key: "handleFormChange",
    value: function handleFormChange() {
      this.state.form == 0 ? this.setState({
        form: 1
      }) : this.setState({
        form: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", null, this.state.form == 0 ? /*#__PURE__*/_react["default"].createElement(LoginForm, {
        className: this.props.className,
        onClick: this.handleChange
      }) : /*#__PURE__*/_react["default"].createElement(RegisterForm, {
        className: this.props.className,
        onClick: this.handleChange
      }));
    }
  }]);

  return AuthForms;
}(_react.Component);

exports["default"] = AuthForms;