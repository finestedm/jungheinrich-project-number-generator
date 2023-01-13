import { useEffect, useState } from "react";
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import branches from '../data/branches'

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        branch: ''
    })

    const { name, email, password, password2, branch } = formData
    
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
        if (password !== password2) {
            console.log('Passwords do not match')
        } else {
            const userData = {
                name, email, password, branch
            }
            dispatch(register(userData))
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <FloatingLabel
                controlId="nameInput"
                label="Imię i nazwisko"
                className="mb-3"
            >
                <Form.Control
                    name='name'
                    placeholder="Andrzej Nowak"
                    onChange={onChange}
                    value={name}
                    type='text'
                />
            </FloatingLabel>
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
            <FloatingLabel
                controlId="password2Input"
                label="Potwierdź hasło"
            >
                <Form.Control
                    name='password2'
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                    value={password2}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="branch"
                label="Oddział"
            >
                <Form.Select
                    name='branch'
                    onChange={onChange}
                    value={branch}
                >
                    <option disabled value={null}>Wybierz oddział</option>
                    {Object.values(branches).map(branch => <option>{branch.value}</option>)}
                </Form.Select>
            </FloatingLabel>
            <Form.Group>
                <Button disabled={isLoading} type="submit">Zarejestruj się</Button>
            </Form.Group>
        </Form>
    )

}