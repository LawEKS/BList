import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"

function Welcome() {
  return (
    <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <Row>
        <Col>
          <h1 className="text-center">BList</h1>
          <p>A destination for book discovery</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup>
            <Button>Click to explore</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Welcome
