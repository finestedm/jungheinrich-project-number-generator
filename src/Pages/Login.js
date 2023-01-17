import { useEffect, useState } from "react";
import { Form, FloatingLabel, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import branches from '../data/branches'

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.authSlice)

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    function onChange(e) {
        setFormData((prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })))
    }

    function onSubmit(e) {
        e.preventDefault()
        const userData = {email, password}
        dispatch(login(userData))
        }
    
    return (
        <Container fluid className='main px-2 px-md-5 py-2 text-center'>
            <h1 className='mt-3 mb-4 px-0'>Zaloguj się<br />
                <small class="text-muted fs-5 fw-normal">Wprowadź użyty podczas rejestracji email oraz hasło</small>
            </h1>
            <Form onSubmit={onSubmit} className='login-form d-flex mx-auto flex-column gap-3'>
                <FloatingLabel
                    controlId="emailInput"
                    label="Email"
                    className="mb-3"
                >
                    <Form.Control
                        name='email'
                        placeholder="ABC@jh.pl"
                        onChange={onChange}
                        value={email}
                        type='email'
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="passwordInput"
                    label="Hasło"
                >
                    <Form.Control
                        name='password'
                        type="password"
                        placeholder="Password"
                        onChange={onChange}
                        value={password}
                    />
                </FloatingLabel>
                <Form.Group className="mt-3">
                    <Button className='btn-ps-accept' size="lg" disabled={isLoading} type="submit">Zaloguj się</Button>
                </Form.Group>
            </Form>
        </Container>
    )

}