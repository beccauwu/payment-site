import { v4 } from "uuid";
import { Stars } from './Stars';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import Placeholder from './Placeholder';

function Review(props) {
  return (
    <Container>
      <Row>
        <Col xs={4}>
          <p className="d-inline">{props.review.user}</p>
          <p className="d-inline"> {props.review.date}</p>
        </Col>
      </Row>
      <Row>
        <Col xs={5} md={4}>
          <Stars value={props.review.stars} />
        </Col>
        <Col xs={7} md={8} className="text-start">
          <p className="giBold mb-0">{props.review.title}</p>
        </Col>
      </Row>
      <Row>
        <Col
          xs={{ span: 11, offset: 1 }}
          md={{ span: 10, offset: 2 }}
          className="text-start"
        >
          <p>{props.review.comment}</p>
        </Col>
      </Row>
    </Container>
  );
}
export default function Reviews(props) {
  console.log(props);
  const { reviews } = props;
  if (reviews) {
    return (
      <Stack gap={2}>
        {reviews.map((review) => (
          <Review key={v4()} review={review} />
        ))}
      </Stack>
    );
  } else {
    return <Placeholder />;
  }
}
