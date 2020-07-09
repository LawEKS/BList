import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import { LinkContainer } from "react-router-bootstrap"

function generateButtonLinkPaths({
  pageNumber,
  searchTerm = null,
}: {
  pageNumber: number
  searchTerm: string | null
}): {
  prevPath: string
  nextPath: string
} {
  const [prevPath, nextPath] = [true, false].map((isPrev) => {
    const pageParam = `page=${isPrev ? pageNumber - 1 : pageNumber + 1}`
    const searchParam = searchTerm ? `&search=${searchTerm}` : ""
    return `/books?${pageParam}${searchParam}`
  })
  return { prevPath, nextPath }
}

function PageButtons({
  prevEnabled = false,
  nextEnabled = false,
  pageNumber,
  searchTerm,
}: {
  prevEnabled: boolean
  nextEnabled: boolean
  pageNumber: number
  searchTerm: string | null
}) {
  const { prevPath, nextPath } = generateButtonLinkPaths({
    pageNumber,
    searchTerm,
  })
  return (
    <Row className="mb-4">
      <Col>
        <ButtonGroup className="w-100" size="lg">
          <LinkContainer to={prevPath}>
            <Button disabled={!prevEnabled}>Prev</Button>
          </LinkContainer>
          <LinkContainer to={nextPath}>
            <Button disabled={!nextEnabled}>Next</Button>
          </LinkContainer>
        </ButtonGroup>
      </Col>
    </Row>
  )
}

export default PageButtons
