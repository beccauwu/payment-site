import { Component } from "react";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap"
import { FontAwesomeIcon as Fa } from "@fortawesome/react-fontawesome";
import { faBackwardFast, faStepBackward, faStepForward, faForwardFast } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";

export function PaginationButtons(props) {
  const { page, pages, handlePageChange } = props;
  return (
    <ButtonToolbar
      className="justify-content-center"
      aria-label="review pagination"
    >
      <ButtonGroup className="me-2" aria-label="Backwards">
        <Button variant="black" onClick={() => handlePageChange(1)}>
          <Fa icon={faBackwardFast} />
        </Button>
        <Button variant="black" onClick={() => handlePageChange(page - 1)}>
          <Fa icon={faStepBackward} />
        </Button>
      </ButtonGroup>
      <ButtonGroup className="me-2" aria-label="Page number">
        {Array(pages + 1)
          .fill()
          .map((_, i) => (
            <Button
              key={v4()}
              variant={i + 1 === page ? "primary" : "black"}
              onClick={() => handlePageChange(i + 1)}
              aria-label={"Page " + (i + 1)}
              active={page === i + 1}
              className={i + 1 === page ? "giBold text-black" : "text-primary"}
            >
              {i + 1}
            </Button>
          ))}
      </ButtonGroup>
      <ButtonGroup aria-label="Forwards">
        <Button variant="black" onClick={() => handlePageChange(page + 1)}>
          <Fa icon={faStepForward} />
        </Button>
        <Button variant="black" onClick={() => handlePageChange(pages)}>
          <Fa icon={faForwardFast} />
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
}
export const Submitbtn = props => {
  const { variant, type, ...other } = props;
  return (
    <Button
      variant={variant || "primary"}
      type={type || "submit"}
      {...other}
    >
    </Button>
  );
}
