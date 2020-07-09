import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import Image from "react-bootstrap/Image"
import Jumbotron from "react-bootstrap/Jumbotron"
import searchIcon from "../../assets/search.svg"
import searchLoadingIcon from "../../assets/search-loading.svg"

function Header({
  onSearchInputChange,
  handleSubmit,
  loading,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onSearchInputChange: (inputValue: string) => void
  loading: boolean
}) {
  return (
    <Row as="header">
      <Col>
        <Jumbotron className="d-flex justify-content-start align-items-center">
          <h1 className="mr-4 mb-0">BList</h1>
          <Form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onSearchInputChange(event.target.value)
                }
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" className="py-0">
                  {loading ? (
                    <Image src={searchLoadingIcon} alt="search-loading" />
                  ) : (
                    <Image src={searchIcon} alt="search" />
                  )}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Jumbotron>
      </Col>
    </Row>
  )
}

export default Header
