import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"

function Header() {
  return (
    <Row as="header">
      <Col>
        <h1>BList</h1>
      </Col>
    </Row>
  )
}
function Books() {
  return (
    <Row as="main" className="flex-grow-1">
      <Col>
        <h2>Books</h2>
      </Col>
    </Row>
  )
}
function PageButtons() {
  return (
    <Row>
      <Col>
        <ButtonGroup>
          <Button>Prev</Button>
          <Button>Next</Button>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

function BookList() {
  return (
    <Container className="d-flex flex-column min-vh-100">
      <Header />
      <Books />
      <PageButtons />
    </Container>
  )
}

export default BookList
