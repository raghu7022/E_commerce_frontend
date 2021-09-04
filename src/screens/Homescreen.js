import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../compnents/Product'
import Message from '../compnents/Message'
import Loader from '../compnents/loader'
import { listProducts } from '../action/productAction'

const Homescreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <br />
            <h1> Xiaomi products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Row>
                {products.map((products) => (
                    <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={products} />
                    </Col>
                ))}
            </Row>
            }
            <br />

        </>
    )
}

export default Homescreen
