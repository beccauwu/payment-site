"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Main = require("./Main");

var _reactBootstrap = require("react-bootstrap");

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

var Stars = /*#__PURE__*/function (_Component) {
  _inherits(Stars, _Component);

  var _super = _createSuper(Stars);

  function Stars() {
    _classCallCheck(this, Stars);

    return _super.apply(this, arguments);
  }

  _createClass(Stars, [{
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Stack, {
        direction: "horizontal",
        className: "justify-content-center"
      }, Array(5).fill().map(function (_, i) {
        return /*#__PURE__*/_react["default"].createElement("i", {
          className: "fa-solid fa-star " + (i + 1 <= _this.props.value ? "text-warning" : "text-secodary"),
          key: uuid.v4(),
          onClick: function onClick() {
            return _this.props.onClick(i + 1);
          },
          onMouseEnter: function onMouseEnter() {
            return _this.props.onMouseEnter(i + 1);
          }
        });
      }));
    }
  }]);

  return Stars;
}(_react.Component);

var ReviewForm = /*#__PURE__*/function (_Component2) {
  _inherits(ReviewForm, _Component2);

  var _super2 = _createSuper(ReviewForm);

  function ReviewForm(props) {
    var _this2;

    _classCallCheck(this, ReviewForm);

    _this2 = _super2.call(this, props);
    _this2.ref = /*#__PURE__*/_react["default"].createRef();
    _this2.state = {
      title: "",
      comment: "",
      stars: 0,
      clicked: false,
      visible: false
    };
    _this2.handleChange = _this2.handleChange.bind(_assertThisInitialized(_this2));
    _this2.handleSubmit = _this2.handleSubmit.bind(_assertThisInitialized(_this2));
    return _this2;
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
      var _this3 = this;

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
          _this3.props.addReview(response);

          _this3.setState({
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
      var _this4 = this;

      if (this.context.auth) {
        var filled = !(!this.state.title && !this.state.comment && this.state.stars === 0);
        return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form, {
          onSubmit: this.handleSubmit,
          className: this.props.className
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
          controlId: "stars"
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Rating"), /*#__PURE__*/_react["default"].createElement(Stars, {
          value: this.state.stars,
          clicked: this.state.clicked,
          onClick: function onClick(value) {
            return _this4.starOnClick(value);
          },
          onMouseEnter: function onMouseEnter(value) {
            return _this4.starsOnMouseEnter(value);
          }
        })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
          controlId: "title"
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Title"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
          required: true,
          name: "title",
          type: "text",
          placeholder: "Enter title",
          value: this.state.title,
          onChange: this.handleChange
        })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Group, {
          controlId: "comment"
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Label, null, "Comment"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
          required: true,
          name: "comment",
          as: "textarea",
          rows: 3,
          placeholder: "Enter comment",
          value: this.state.comment,
          onChange: this.handleChange
        })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, _extends({
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
            return _this4.toggleVisible();
          }
        }, "Login", " "), /*#__PURE__*/_react["default"].createElement("p", {
          className: "d-inline"
        }, "to review")), /*#__PURE__*/_react["default"].createElement("div", {
          ref: this.ref
        }, /*#__PURE__*/_react["default"].createElement(LoginForm, {
          className: this.state.visible ? "d-block" : "d-none"
        })));
      }
    }
  }]);

  return ReviewForm;
}(_react.Component);

ReviewForm.contextType = _Main.AppContext;

var BasketComponents = /*#__PURE__*/function (_Component3) {
  _inherits(BasketComponents, _Component3);

  var _super3 = _createSuper(BasketComponents);

  function BasketComponents(props) {
    var _this5;

    _classCallCheck(this, BasketComponents);

    _this5 = _super3.call(this, props);
    _this5.state = {
      id: props.id,
      quantity: props.amount
    };
    return _this5;
  }

  _createClass(BasketComponents, [{
    key: "set",
    value: function set(value) {
      this.context.waitBasket();
      $.ajax({
        url: "http://127.0.0.1:8000/api/shop/basket/" + this.state.id + "/",
        dataType: "json",
        type: "POST",
        cache: false,
        data: {
          quantity: value
        },
        success: function (data) {
          this.context.setBasket(data);
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, {
        className: "justify-content-center"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
        xs: 3,
        md: 2
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Form.Control, {
        type: "number",
        value: this.state.quantity,
        onChange: function onChange(e) {
          return _this6.setState({
            quantity: e.target.value
          });
        }
      })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
        xs: 5,
        className: "align-self-center"
      }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Button, {
        size: "sm",
        onClick: function onClick() {
          return _this6.set(_this6.state.quantity);
        }
      }, "Add To Basket")));
    }
  }]);

  return BasketComponents;
}(_react.Component);

BasketComponents.contextType = _Main.BasketContext;

function Review(props) {
  return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Container, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 4
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "d-inline"
  }, props.review.user), /*#__PURE__*/_react["default"].createElement("p", {
    className: "d-inline"
  }, " ", props.review.date))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 5,
    md: 4
  }, /*#__PURE__*/_react["default"].createElement(Stars, {
    value: props.review.stars
  })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: 7,
    md: 8,
    className: "text-start"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "giBold mb-0"
  }, props.review.title))), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
    xs: {
      span: 11,
      offset: 1
    },
    md: {
      span: 10,
      offset: 2
    },
    className: "text-start"
  }, /*#__PURE__*/_react["default"].createElement("p", null, props.review.comment))));
}

function Reviews(props) {
  console.log(props);
  var reviews = props.reviews;

  if (reviews) {
    return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Stack, {
      gap: 2
    }, reviews.map(function (review, i) {
      return /*#__PURE__*/_react["default"].createElement(Review, {
        key: uuid.v4(),
        review: review
      });
    }));
  } else {
    return /*#__PURE__*/_react["default"].createElement(_Main.PlaceHolder, null);
  }
} //TODO: Make review form, test reviews


var ProductModal = /*#__PURE__*/function (_Component4) {
  _inherits(ProductModal, _Component4);

  var _super4 = _createSuper(ProductModal);

  function ProductModal(props) {
    var _this7;

    _classCallCheck(this, ProductModal);

    _this7 = _super4.call(this, props);
    _this7.state = {
      perPage: 2,
      page: 1,
      pages: 1,
      show: false
    };
    return _this7;
  }

  _createClass(ProductModal, [{
    key: "toggleShow",
    value: function toggleShow() {
      this.setState({
        show: !this.state.show
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var page = this.state.page;
      var perPage = this.state.perPage;
      var pages = this.state.pages;
      var reviews;

      if (!this.props.itm) {
        return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal, {
          show: this.props.show,
          onHide: this.props.onClose,
          size: "lg",
          "aria-labelledby": "product-modal-title",
          centered: true
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Header, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Title, {
          id: "product-modal-title"
        }, "Loading...")), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react["default"].createElement(_Main.PlaceHolder, null)));
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

        return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal, {
          show: this.props.show,
          onHide: this.props.onClose,
          fullscreen: true,
          "aria-labelledby": "product-modal-title"
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Header, {
          closeButton: true
        }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Title, {
          id: "product-modal-title giBold"
        }, itm.prod_name)), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Modal.Body, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Stack, {
          direction: "horizontal",
          gap: 1
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "h-100"
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "fa-solid fa-circle-left align-self-center fs-3",
          onClick: function onClick() {
            return itm.index > 0 && _this8.props.switchProduct(itm.index - 1);
          }
        })), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Stack, {
          gap: 2,
          className: "col-md-5 mx-auto text-center"
        }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
          src: itm.img,
          alt: itm.prod_name + "product image",
          className: "rounded-circle",
          width: 200
        })), /*#__PURE__*/_react["default"].createElement(Stars, {
          value: itm.average_rating
        }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("p", {
          className: "mb-0 fs-5"
        }, "\u20AC", itm.price), /*#__PURE__*/_react["default"].createElement("p", null, itm.description)), /*#__PURE__*/_react["default"].createElement(BasketComponents, {
          id: itm.id,
          amount: itm.quantity
        }), /*#__PURE__*/_react["default"].createElement("a", {
          href: "#",
          onClick: function onClick() {
            return _this8.toggleShow();
          }
        }, "Leave a review!"), /*#__PURE__*/_react["default"].createElement(ReviewForm, {
          product: itm,
          addReview: function addReview(review) {
            return _this8.props.addReview(review);
          },
          className: this.state.show ? "d-block" : "d-none"
        }), reviews != null && /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Stack, {
          gap: 2,
          className: "rounded my-2 border border-3 p-2 border-primary"
        }, /*#__PURE__*/_react["default"].createElement(Reviews, {
          reviews: reviews,
          perPage: perPage
        }), /*#__PURE__*/_react["default"].createElement(_Main.PaginationButtons, {
          page: page,
          pages: pages,
          handlePageChange: function handlePageChange(page) {
            return _this8.setState({
              page: page
            });
          }
        }))), /*#__PURE__*/_react["default"].createElement("div", {
          className: "h-100",
          onClick: function onClick() {
            return itm.index < itm.out_of && _this8.props.switchProduct(itm.index + 1);
          }
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "fa-solid fa-circle-right align-self-center fs-3"
        })))));
      }
    }
  }]);

  return ProductModal;
}(_react.Component);

ProductModal.contextType = _Main.AppContext;

var Shop = /*#__PURE__*/function (_Component5) {
  _inherits(Shop, _Component5);

  var _super5 = _createSuper(Shop);

  function Shop(props) {
    var _this9;

    _classCallCheck(this, Shop);

    _this9 = _super5.call(this, props);
    _this9.state = {
      show: false,
      item: null,
      quantity: 1,
      sort: 0,
      open: false
    };
    return _this9;
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
      var _this10 = this;

      var products = this.context.products;

      if (this.context.prodError) {
        return /*#__PURE__*/_react["default"].createElement(Alert, {
          type: "error",
          message: this.context.prodError.message
        });
      } else if (!this.context.prodIsLoaded) {
        return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Row, null, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, null, /*#__PURE__*/_react["default"].createElement(_Main.PlaceHolder, null)), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, null, /*#__PURE__*/_react["default"].createElement(_Main.PlaceHolder, null)));
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
        }, [[0, "prod_name", "Name"], [1, "price", "Price"], [2, "average_rating", "Rating"]].map(function (item, i) {
          return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
            key: uuid.v4()
          }, /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Item, {
            as: _reactBootstrap.Button,
            onClick: function onClick() {
              _this10.setState({
                sort: item[0],
                open: false
              });

              _this10.context.sort(item[1], "asc");
            },
            className: _this10.state.sort === item[0] ? "text-black giBold active" : "text-light"
          }, item[2] + " (ascending)"), /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Dropdown.Item, {
            as: _reactBootstrap.Button,
            key: uuid.v4(),
            onClick: function onClick() {
              _this10.setState({
                sort: item[0] + 3,
                open: false
              });

              _this10.context.sort(item[1], "desc");
            },
            className: _this10.state.sort === item[0] + 3 ? "text-black giBold active" : "text-light"
          }, item[2] + " (descending)"));
        })))), products.map(function (item, i) {
          return /*#__PURE__*/_react["default"].createElement(_reactBootstrap.Col, {
            className: "wi-fc text-center text-primary p-2",
            key: uuid.v4(),
            onClick: function onClick() {
              return _this10.handleClick(i);
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
        })), /*#__PURE__*/_react["default"].createElement(ProductModal, {
          show: this.state.show,
          onClose: function onClose() {
            return _this10.handleClose();
          },
          itm: this.state.item,
          addReview: function addReview(review) {
            return _this10.addReview(review);
          },
          switchProduct: function switchProduct(i) {
            return _this10.handleClick(i);
          }
        }));
      }
    }
  }]);

  return Shop;
}(_react.Component);

exports["default"] = Shop;
Shop.ContextType = _Main.AppContext; // class Shop extends Component {
//   render() {
//     return (
//       <App>
//         <Products />
//       </App>
//     );
//   }
// }
// const element = (
//   <>
//     <Shop />
//   </>
// );
// const root = createRoot(document.getElementById("root"));
// root.render(element);