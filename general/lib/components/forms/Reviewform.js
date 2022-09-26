"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _Context = _interopRequireDefault(require("../context/Context"));

var _Authforms = _interopRequireDefault(require("./Authforms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var ReviewForm = /*#__PURE__*/function (_Component) {
  _inherits(ReviewForm, _Component);

  var _super = _createSuper(ReviewForm);

  function ReviewForm(props) {
    var _this;

    _classCallCheck(this, ReviewForm);

    _this = _super.call(this, props);
    _this.ref = /*#__PURE__*/_react["default"].createRef();
    _this.state = {
      title: "",
      comment: "",
      stars: 0,
      clicked: false,
      visible: false
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ReviewForm, [{
    key: "starOnClick",
    value: function starOnClick(value) {
      this.setState({
        stars: value,
        clicked: true
      });
    }
  }, {
    key: "starsOnMouseEnter",
    value: function starsOnMouseEnter(value) {
      !this.state.clicked ? this.setState({
        stars: value
      }) : null;
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var target = event.target;
      var value = target.value;
      var name = target.name;
      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();
      var data = {
        title: this.state.title,
        comment: this.state.comment,
        stars: this.state.stars
      };
      console.log(data);
      $.ajax({
        url: "http://127.0.0.1:8000/api/products/".concat(this.props.product.id, "/reviews/"),
        type: "POST",
        dataType: "application/json",
        headers: {
          Authorization: "Token ".concat(this.context.auth.token),
          "X-CSRFToken": getCookie("csrftoken")
        },
        data: {
          title: this.state.title,
          comment: this.state.comment,
          stars: this.state.stars
        },
        success: function success(response) {
          _this2.props.addReview(response);

          _this2.setState({
            title: "",
            comment: "",
            stars: 0
          });
        },
        error: function error(_error) {
          console.log(_error);
        }
      });
    }
  }, {
    key: "toggleVisible",
    value: function toggleVisible() {
      this.setState({
        visible: !this.state.visible
      });
      this.state.visible && this.ref.current.scrollIntoView();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.context.auth) {
        var filled = !(!this.state.title && !this.state.comment && this.state.stars === 0);
        return /*#__PURE__*/_react["default"].createElement(Form, {
          onSubmit: this.handleSubmit,
          className: this.props.className
        }, /*#__PURE__*/_react["default"].createElement(Form.Group, {
          controlId: "stars"
        }, /*#__PURE__*/_react["default"].createElement(Form.Label, null, "Rating"), /*#__PURE__*/_react["default"].createElement(Stars, {
          value: this.state.stars,
          clicked: this.state.clicked,
          onClick: function onClick(value) {
            return _this3.starOnClick(value);
          },
          onMouseEnter: function onMouseEnter(value) {
            return _this3.starsOnMouseEnter(value);
          }
        })), /*#__PURE__*/_react["default"].createElement(Form.Group, {
          controlId: "title"
        }, /*#__PURE__*/_react["default"].createElement(Form.Label, null, "Title"), /*#__PURE__*/_react["default"].createElement(Form.Control, {
          required: true,
          name: "title",
          type: "text",
          placeholder: "Enter title",
          value: this.state.title,
          onChange: this.handleChange
        })), /*#__PURE__*/_react["default"].createElement(Form.Group, {
          controlId: "comment"
        }, /*#__PURE__*/_react["default"].createElement(Form.Label, null, "Comment"), /*#__PURE__*/_react["default"].createElement(Form.Control, {
          required: true,
          name: "comment",
          as: "textarea",
          rows: 3,
          placeholder: "Enter comment",
          value: this.state.comment,
          onChange: this.handleChange
        })), /*#__PURE__*/_react["default"].createElement(Button, _extends({
          variant: "primary",
          type: filled ? "submit" : "button"
        }, filled ? {} : {
          disabled: true
        }), "Submit"));
      } else {
        return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Stack, {
          gap: 2
        }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("a", {
          className: "d-inline",
          href: "#",
          onClick: function onClick() {
            return _this3.toggleVisible();
          }
        }, "Login", " "), /*#__PURE__*/_react["default"].createElement("p", {
          className: "d-inline"
        }, "to review")), /*#__PURE__*/_react["default"].createElement("div", {
          ref: this.ref
        }, /*#__PURE__*/_react["default"].createElement(_Authforms["default"], {
          className: this.state.visible ? "d-block" : "d-none"
        })));
      }
    }
  }]);

  return ReviewForm;
}(_react.Component);

ReviewForm.contextType = _Context["default"].app;
var _default = ReviewForm;
exports["default"] = _default;