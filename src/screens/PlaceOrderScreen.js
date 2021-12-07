import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../compnents/Message'
import CheckoutSteps from '../compnents/CheckoutSteps'
import { createOrder } from '../action/orderActions'


const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    cart.itemsPrice = Number(cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0))
    cart.ShippingPrice = Number(cart.itemsPrice > 500 ? 0 : 99)
    cart.taxPrice = Number((0.14 * cart.itemsPrice)).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.ShippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector((state) => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    }, [history, success])

    const PlaceOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            ShippingPrice: cart.ShippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping Address </h2>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address} ,
                            {cart.shippingAddress.city} ,
                            {cart.shippingAddress.pinCode} ,
                            {cart.shippingAddress.country}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h1>Order Items</h1>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty}  X ₹{item.price} = ₹{item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>)}

                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items :</Col>
                                    <Col>₹{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping :</Col>
                                    <Col>₹{cart.ShippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax :</Col>
                                    <Col>₹{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Amount:</Col>
                                    <Col>₹{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' variant='dark' id='order' className='btn-block' disabled={cart.cartItems.length === 0}
                                    onClick={PlaceOrderHandler}> Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
