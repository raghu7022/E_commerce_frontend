import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Row >
                <Col md={11}>
                    <Form.Control type='text' name='q' id='searchBox' onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search Products...' className='mr-sm-2 ml-sm-5'>
                    </Form.Control>
                </Col>
                <Col md={1}>
                    <Button type='submit' variant='secondary' id='search'>Search</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default SearchBox