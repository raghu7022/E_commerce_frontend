import React, { useEffect } from 'react'
import { Row, Col, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../compnents/Message'
import Loader from '../compnents/loader'
import { getUserDetails } from '../action/userAction'
import { listMyOrders } from '../action/orderActions'

const MyOrderScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading, error, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }
        }
    }, [history, userInfo, dispatch, user])

    return <Row>
        <Col md={8}>
            <h2>My Orders</h2>
            {loading ? <Loader /> : error ? <Message variant='warning'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm' >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (
                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>
}

export default MyOrderScreen
