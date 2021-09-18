import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../compnents/Message'
import Loader from '../compnents/loader'
import { getOrderDetails, payOrder, deliverOrder } from '../action/orderActions'


const OrderScreen = ({ match }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, error: errorPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, error: errorDeliver } = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    const paidHandler = () => {
        dispatch(payOrder(order))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='light'>{error}</Message> :
        <>
            <h1>Order Id:{order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping Address </h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address} ,
                                {order.shippingAddress.city} ,
                                {order.shippingAddress.pinCode} ,
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (<Message variant='success' >Delivered On: {order.deliveredAt.substring(0, 10)}</Message>) :
                                (<Message variant='light'>Not Delivered</Message>)}

                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p><strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message variant='success'>Paid On: {order.paidAt.substring(0, 10)}</Message>) : (<Message variant='light'>Not Paid</Message>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h1>Order Items</h1>
                            {order.orderItems.length === 0 ? (
                                <Message>No Orders</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                    <Col>₹{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping :</Col>
                                    <Col>₹{order.ShippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax :</Col>
                                    <Col>₹{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Amount:</Col>
                                    <Col>₹{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {loadingDeliver && <Loader />}
                            {loadingPay && <Loader />}
                            {errorPay && <Message variant='danger'>{errorPay}</Message>}
                            {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
                            {userInfo.isAdmin && !order.isPaid && (
                                <ListGroup.Item>
                                    <Row>
                                        <Button type='button' variant='dark' className='btn btn-block' onClick={paidHandler}>
                                            Mark As Paid
                                        </Button>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            {userInfo.isAdmin && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Row>
                                        <Button type='button' variant='dark' className='btn btn-block' onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </Row>
                                </ListGroup.Item>

                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderScreen