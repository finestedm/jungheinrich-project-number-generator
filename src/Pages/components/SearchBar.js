import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'

export default function SearchBar(props) {
    const {searchedPhrase, setSearchedPhrase, requestSearchedPosts} = props
    return (
        <Col className='mb-3'>
            <Form className='d-flex'>
                <Form.Control
                    className='main--search-input'
                    variant="outlined"
                    placeholder="Wyszukaj"
                    value={searchedPhrase}
                    onChange={(e) => setSearchedPhrase(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            requestSearchedPosts()
                        }
                    }}
                />
                <Button onClick={() => requestSearchedPosts()}>Szukaj</Button>
            </Form>
        </Col>
    )
}