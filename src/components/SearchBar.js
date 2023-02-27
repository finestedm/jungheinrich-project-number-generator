import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form, InputGroup } from 'react-bootstrap'
import {IoSearch, IoClose} from 'react-icons/io5'


export default function SearchBar(props) {
    const { searchedPhrase, changeSearchedPhrase, requestSearchedPosts } = props
    
    return (
        <InputGroup className='main--search-bar'>
            <Button variant='outline-secondary bg-white' ><IoSearch onClick={requestSearchedPosts} className='search-input--search-icon' /></Button>
            {searchedPhrase ? <Button variant='outline-secondary bg-white' className='search-input--delete' onClick={() => changeSearchedPhrase('')}><IoClose className='search-input--delete-icon' /></Button> : ''}
            <Form.Control
                className='main--search-input text-end'
                variant="outlined"
                placeholder='Szukaj projektu'
                value={searchedPhrase}
                onChange={(e) => changeSearchedPhrase(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        requestSearchedPosts()
                    } else if (e.key === 'Escape') {
                        changeSearchedPhrase('')
                    }
                }}
            />
        </InputGroup>
    )
}