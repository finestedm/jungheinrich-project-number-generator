import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap'
import { CgSearch } from 'react-icons/cg'
import {TiDeleteOutline} from 'react-icons/ti'


export default function SearchBar(props) {
    const {searchedPhrase, setSearchedPhrase, requestSearchedPosts} = props
    return (
        <Col className='col-4'>
            <InputGroup className='d-flex' size='sm'>
                <Form.Control
                    className='main--search-input'
                    variant="outlined"
                    placeholder="Szukaj projektu"
                    value={searchedPhrase}
                    onChange={(e) => setSearchedPhrase(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault()
                            requestSearchedPosts()
                        }
                    }}
                />
                {/* <Button variant='outline-secondary bg-white border border-none' onClick={{}}><TiDeleteOutline /></Button> */}
                <Button variant='warning' onClick={() => requestSearchedPosts()}><CgSearch /></Button>
            </InputGroup>
        </Col>
    )
}