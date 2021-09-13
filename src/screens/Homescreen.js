import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../compnents/Product'
import Message from '../compnents/Message'
import Loader from '../compnents/loader'
import Paginate from '../compnents/Paginate'
import { listProducts } from '../action/productAction'
import ProductCarousel from '../compnents/ProductCarousel'
import Meta from '../compnents/Meta'

const Homescreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {!keyword && <ProductCarousel />}
            <h1> Xiaomi products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        {products.map((products) => (
                            <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={products} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
            <br />

        </>
    )
}

export default Homescreen
