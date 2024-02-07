import React, { useState, useEffect } from 'react'
import {Link,  useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { redirect } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'



function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    const navigate = useNavigate()
    const dispatch = useDispatch()

    /**
     * Handle the form submission.
     * 
     * @param {Event} e - The form submit event.
     */
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Not yet registered? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen