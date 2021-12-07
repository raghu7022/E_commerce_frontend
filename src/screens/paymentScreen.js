import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../compnents/FormContainer'
import { savePaymentMethod } from '../action/cartActions'
import CheckoutSteps from '../compnents/CheckoutSteps'

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Cash')

    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form >
                <Form.Group >
                    <Form.Label as='legend'>Select Method</Form.Label>

                    <Col>

                        <Form.Check type='radio' label='Cash On Delivery'
                            id='Cash' name='paymentMethod' value='Cash' checked onChange={(e) => setPaymentMethod
                                (e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <br />
                <Button type='submit' variant='dark' id='placeOrder' onClick={submitHandler}> Continue To Place Order</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
