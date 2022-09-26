import { Component } from "react";
import { Modal, Stack } from "react-bootstrap";
import Stars from "../elements/Stars";
import PaginationButtons from "../elements/Buttons";
import Context from "../context/Context";
import Reviews from "./Reviews";

class Productmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 2,
      page: 1,
      pages: 1,
      show: false,
    };
  }
  toggleShow() {
    this.setState({ show: !this.state.show });
  }
  render() {
    const page = this.state.page;
    const perPage = this.state.perPage;
    const pages = this.state.pages;
    let reviews;
    if (!this.props.itm) {
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.onClose}
          size="lg"
          aria-labelledby="product-modal-title"
          centered
        >
          <Modal.Header>
            <Modal.Title id="product-modal-title">Loading...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PlaceHolder />
          </Modal.Body>
        </Modal>
      );
    } else {
      const itm = this.props.itm;
      if (itm.reviews) {
        if (page === 1) {
          reviews = itm.reviews.slice(0, perPage);
        } else {
          reviews = itm.reviews.slice((page - 1) * perPage, page * perPage);
        }
      } else {
        reviews = null;
      }
      return (
        <Modal
          show={this.props.show}
          onHide={this.props.onClose}
          fullscreen
          aria-labelledby="product-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="product-modal-title giBold">
              {itm.prod_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Stack direction="horizontal" gap={1}>
              <div className="h-100">
                <span
                  className="fa-solid fa-circle-left align-self-center fs-3"
                  onClick={() =>
                    itm.index > 0 && this.props.switchProduct(itm.index - 1)
                  }
                ></span>
              </div>
              <Stack gap={2} className="col-md-5 mx-auto text-center">
                <div>
                  <img
                    src={itm.img}
                    alt={itm.prod_name + "product image"}
                    className="rounded-circle"
                    width={200}
                  />
                </div>
                <Stars value={itm.average_rating} />
                <div>
                  <p className="mb-0 fs-5">€{itm.price}</p>
                  <p>{itm.description}</p>
                </div>
                <BasketComponents id={itm.id} amount={itm.quantity} />
                <a href="#" onClick={() => this.toggleShow()}>
                  Leave a review!
                </a>
                <ReviewForm
                  product={itm}
                  addReview={(review) => this.props.addReview(review)}
                  className={this.state.show ? "d-block" : "d-none"}
                />
                {reviews != null && (
                  <Stack
                    gap={2}
                    className="rounded my-2 border border-3 p-2 border-primary"
                  >
                    <Reviews reviews={reviews} perPage={perPage} />
                    <PaginationButtons
                      page={page}
                      pages={pages}
                      handlePageChange={(page) => this.setState({ page: page })}
                    />
                  </Stack>
                )}
              </Stack>
              <div
                className="h-100"
                onClick={() =>
                  itm.index < itm.out_of &&
                  this.props.switchProduct(itm.index + 1)
                }
              >
                <span className="fa-solid fa-circle-right align-self-center fs-3"></span>
              </div>
            </Stack>
          </Modal.Body>
        </Modal>
      );
    }
  }
}
Productmodal.contextType = Context.app;
export default Productmodal;
