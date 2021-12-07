import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../compnents/FormContainer'
import { saveShippingAddress } from '../action/cartActions'
import CheckoutSteps from '../compnents/CheckoutSteps'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, stateAddress] = useState(shippingAddress.address)
    const [city, stateCity] = useState(shippingAddress.city)
    const [pinCode, statePinCode] = useState(shippingAddress.pinCode)
    const [country, stateCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, pinCode, country }))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address </Form.Label>
                    <Form.Control type='text' placeholder='Enter Your Address' value={address} onChange={(e) => stateAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City </Form.Label>
                    <Form.Control type='text' placeholder='Enter Your City' value={city} onChange={(e) => stateCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='pinCode'>
                    <Form.Label>Pin Code </Form.Label>
                    <Form.Control type='text' placeholder='Enter Your Pin Code' value={pinCode} onChange={(e) => statePinCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country </Form.Label>
                    <Form.Control type='text' placeholder='Enter Your Country' value={country} onChange={(e) => stateCountry(e.target.value)}></Form.Control>
                </Form.Group>
                <br />
                <Button type='submit' id='payment' variant='dark'> Continue To Payment</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
