"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Context = _interopRequireDefault(require("../context/Context"));

var _Placeholder = _interopRequireDefault(require("../elements/Placeholder"));

var _Prodmodal = _interopRequireDefault(require("../elements/Prodmodal"));

var _reactBootstrap = require("react-bootstrap");

var _uuid = require("uuid");

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

//TODO: Make review form, test reviews
var Shop = /*#__PURE__*/function (_Component) {
  _inherits(Shop, _Component);

  var _super = _createSuper(Shop);

  function Shop(props) {
    var _this;

    _classCallCheck(this, Shop);

    _this = _super.call(this, props);
    _this.state = {
      show: false,
      item: null,
      quantity: 1,
      sort: 0,
      open: false
    };
    return _this;
  }

  _createClass(Shop, [{
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
    key: "handleClick",
    value: function handleClick(i) {
      var prod = this.context.products[i];
      var bitm = this.context.basket.find(function (item) {
        return item.id === prod.id;
      });

      if (bitm) {
        prod.quantity = bitm.quantity;
      } else {
        prod.quantity = 1;
      }

      prod.index = i;
      prod.out_of = this.context.products.length - 1;
      this.setState({
        item: prod
      });
      this.handleShow();
    }
  }, {
    key: "addReview",
    value: function addReview(review) {
      var prod = this.context.products.find(function (item) {
        return item.id === review.product;
      });
      prod.reviews.push(review);
      prod.average_rating = (prod.average_rating + review.stars) / prod.reviews.length;
      this.setState({
        item: prod
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var products = this.context.products;

      if (this.context.prodError) {
        return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Alert, {
          type: "error",
          message: this.context.prodError.message
        });
      } else if (!this.context.prodIsLoaded) {
        return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, null, /*#__PURE__*/_react["default"].createElement(_Placeholder["default"], null)), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, null, /*#__PURE__*/_react["default"].createElement(_Placeholder["default"], null)));
      } else {
        return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Container, {
          fluid: true
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, {
          className: "justify-content-center"
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
          xs: 12
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Toggle, {
          size: "sm",
          drop: "down",
          title: "Sort by",
          className: "float-end giBold"
        }, "Sort by", " "), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Menu, {
          variant: "dark"
        }, [[0, "prod_name", "Name"], [1, "price", "Price"], [2, "average_rating", "Rating"]].map(function (item) {
          return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
            key: (0, _uuid.v4)()
          }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Item, {
            as: _reactBootstrap.Button,
            onClick: function onClick() {
              _this2.setState({
                sort: item[0],
                open: false
              });

              _this2.context.sort(item[1], "asc");
            },
            className: _this2.state.sort === item[0] ? "text-black giBold active" : "text-light"
          }, item[2] + " (ascending)"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Item, {
            as: _reactBootstrap.Button,
            onClick: function onClick() {
              _this2.setState({
                sort: item[0] + 3,
                open: false
              });

              _this2.context.sort(item[1], "desc");
            },
            className: _this2.state.sort === item[0] + 3 ? "text-black giBold active" : "text-light"
          }, item[2] + " (descending)"));
        })))), products.map(function (item, i) {
          return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
            className: "wi-fc text-center text-primary p-2",
            key: (0, _uuid.v4)(),
            onClick: function onClick() {
              return _this2.handleClick(i);
            }
          }, /*#__PURE__*/_react["default"].createElement("div", {
            className: "description mx-auto"
          }, /*#__PURE__*/_react["default"].createElement("img", {
            className: "d-block mx-auto rounded-circle",
            src: item.img,
            alt: "product image",
            width: 100
          })), /*#__PURE__*/_react["default"].createElement("div", {
            className: "text-center"
          }, /*#__PURE__*/_react["default"].createElement("h3", {
            className: "giBold"
          }, item.prod_name), /*#__PURE__*/_react["default"].createElement("p", {
            className: "text-light"
          }, "\u20AC", item.price)));
        })), /*#__PURE__*/_react["default"].createElement(_Prodmodal["default"], {
          show: this.state.show,
          onClose: function onClose() {
            return _this2.handleClose();
          },
          itm: this.state.item,
          addReview: function addReview(review) {
            return _this2.addReview(review);
          },
          switchProduct: function switchProduct(i) {
            return _this2.handleClick(i);
          }
        }));
      }
    }
  }]);

  return Shop;
}(_react.Component);

Shop.ContextType = _Context["default"].app;
var _default = Shop;
exports["default"] = _default;