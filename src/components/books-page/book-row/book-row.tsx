import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function BookRow({ children }: { children: React.ReactNode }) {
  return (
    <Row as="main" className="flex-grow-1">
      <Col>{children}</Col>
    </Row>
  )
}

export default BookRow
