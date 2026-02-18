/**
 * Bootstrap Component Utilities
 * This file demonstrates how to use React Bootstrap components in your E-commerce app
 */

import React from 'react';
import { Button, Card, Container, Row, Col, Alert, Badge, Pagination, Form, Table, Modal } from 'react-bootstrap';

// Example 1: Button Variants
export const ButtonExamples = () => (
  <div className="p-3 gap-2 d-flex">
    <Button variant="primary">Primary Button</Button>
    <Button variant="success">Success Button</Button>
    <Button variant="danger">Danger Button</Button>
    <Button variant="warning">Warning Button</Button>
    <Button variant="info">Info Button</Button>
    <Button variant="light">Light Button</Button>
    <Button variant="dark">Dark Button</Button>
    <Button variant="outline-primary">Outline Primary</Button>
  </div>
);

// Example 2: Alert Components
export const AlertExamples = () => (
  <div className="p-3">
    <Alert variant="success">
      <Alert.Heading>Success!</Alert.Heading>
      <p>Your operation was successful.</p>
    </Alert>
    <Alert variant="danger">
      <Alert.Heading>Error!</Alert.Heading>
      <p>Something went wrong. Please try again.</p>
    </Alert>
    <Alert variant="warning">
      <Alert.Heading>Warning</Alert.Heading>
      <p>Be careful with this action.</p>
    </Alert>
    <Alert variant="info">
      <Alert.Heading>Info</Alert.Heading>
      <p>Here is some helpful information.</p>
    </Alert>
  </div>
);

// Example 3: Card Components
export const CardExamples = () => (
  <Row className="g-3">
    <Col md={4}>
      <Card>
        <Card.Img variant="top" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" />
        <Card.Body>
          <Card.Title>Product Name</Card.Title>
          <Card.Text>Product description goes here</Card.Text>
          <Button variant="primary">View Details</Button>
        </Card.Body>
      </Card>
    </Col>
    <Col md={4}>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title>Premium Headphones</Card.Title>
          <Card.Text>High-quality audio experience</Card.Text>
          <Badge bg="success" className="me-2">In Stock</Badge>
          <Badge bg="secondary">$199</Badge>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);

// Example 4: Badge Components
export const BadgeExamples = () => (
  <div className="p-3 gap-2 d-flex flex-wrap">
    <Badge bg="primary">Primary</Badge>
    <Badge bg="secondary">Secondary</Badge>
    <Badge bg="success">Success</Badge>
    <Badge bg="danger">Danger</Badge>
    <Badge bg="warning" text="dark">Warning</Badge>
    <Badge bg="info">Info</Badge>
    <Badge bg="light" text="dark">Light</Badge>
    <Badge bg="dark">Dark</Badge>
    <Badge pill bg="primary">Pill Badge</Badge>
  </div>
);

// Example 5: Form Components
export const FormExamples = () => (
  <Form className="p-3">
    <Form.Group className="mb-3">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Enter password" />
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Check type="checkbox" label="Remember me" />
    </Form.Group>

    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
);

// Example 6: Grid Layout
export const GridExample = () => (
  <Container fluid className="p-3">
    <Row className="g-3">
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card className="text-center">
          <Card.Body>Col-3</Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card className="text-center">
          <Card.Body>Col-3</Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card className="text-center">
          <Card.Body>Col-3</Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card className="text-center">
          <Card.Body>Col-3</Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

// Example 7: Modal Component
export const ModalExample = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>Modal Title</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Modal content goes here. You can add any content you want.
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);

// Example 8: Table Component
export const TableExample = () => (
  <Table striped bordered hover className="mt-3">
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Wireless Headphones</td>
        <td>$199</td>
        <td>45</td>
        <td><Badge bg="success">In Stock</Badge></td>
      </tr>
      <tr>
        <td>Smart Watch</td>
        <td>$349</td>
        <td>12</td>
        <td><Badge bg="warning">Low Stock</Badge></td>
      </tr>
      <tr>
        <td>Camera</td>
        <td>$1,299</td>
        <td>0</td>
        <td><Badge bg="danger">Out of Stock</Badge></td>
      </tr>
    </tbody>
  </Table>
);

// Example 9: Pagination
export const PaginationExample = () => (
  <Pagination className="mt-4">
    <Pagination.First />
    <Pagination.Prev />
    <Pagination.Item>{1}</Pagination.Item>
    <Pagination.Item active>{2}</Pagination.Item>
    <Pagination.Item>{3}</Pagination.Item>
    <Pagination.Item disabled>...</Pagination.Item>
    <Pagination.Item>{10}</Pagination.Item>
    <Pagination.Next />
    <Pagination.Last />
  </Pagination>
);

// Use in your components like this:
// import { ButtonExamples, AlertExamples, CardExamples } from './utils/BootstrapComponents';

export default {
  ButtonExamples,
  AlertExamples,
  CardExamples,
  BadgeExamples,
  FormExamples,
  GridExample,
  ModalExample,
  TableExample,
  PaginationExample
};
