import React from "react";
import {Modal, Button} from 'react-bootstrap'

export default function EditPostModal(props) {
    const {showModal, setShowModal, postToEdit} = props
    return (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Modal body text</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}