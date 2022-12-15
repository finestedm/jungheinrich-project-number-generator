import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap'
import {IoSearch, IoClose} from 'react-icons/io5'


export default function SearchBar(props) {
    const {searchedPhrase, setSearchedPhrase, requestSearchedPosts} = props
    return (
        <InputGroup>
            <Button variant='outline-secondary bg-white border border-none' onClick={requestSearchedPosts}><IoSearch className='search-input--search-icon' /></Button>
            {searchedPhrase ? <Button variant='outline-secondary bg-white border border-none' className='search-input--delete' onClick={() => setSearchedPhrase('')}><IoClose className='search-input--delete-icon' /></Button> : ''}
            <Form.Control
                className='main--search-input text-end'
                variant="outlined"
                placeholder='Szukaj projektu'
                value={searchedPhrase}
                onChange={(e) => setSearchedPhrase(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        requestSearchedPosts()
                    } else if (e.key === 'Escape') {
                        setSearchedPhrase('')
                    }
                }}
            />
        </InputGroup>
    )
}