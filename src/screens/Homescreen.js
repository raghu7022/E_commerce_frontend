import React, { useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../compnents/Product'
import Message from '../compnents/Message'
import Loader from '../compnents/loader'
import Paginate from '../compnents/Paginate'
import { listProducts } from '../action/productAction'
import ProductCarousel from '../compnents/ProductCarousel'
import Meta from '../compnents/Meta'

const Homescreen = ({ match, history }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const addBundelToCartHandler = () => {
        history.push(`/bundle/${match.params.id}`)
    }

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {!keyword && <ProductCarousel />}
            <h1> Groceries</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        {products.map((products) => (
                            <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={products} id='product' />
                                {userInfo && userInfo.isAdmin && (
                                    <Button variant='dark' id='AddToBundel' onClick={addBundelToCartHandler}>Add To Bundel</Button>
                                )}
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
