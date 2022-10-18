import React from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import products from "../products";
import { Row, Col, Image, Card, Button, ListGroup } from "react-bootstrap";

const ProductScreen = ({ match }) => {
  const params = useParams();
  const pro = products.find((p) => p._id === params.id);
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={pro.image} alt={pro.name} fluid />
        </Col>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{pro.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={pro.rating} text={`${pro.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Price:{pro.price}</ListGroup.Item>
            <ListGroup.Item>Description :{pro.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>price:</Col>
                  <Col>
                    <strong>${pro.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>status:</Col>
                  <Col>
                    {pro.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={pro.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
