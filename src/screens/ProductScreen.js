import React, { useEffect, useState } from 'react'
import { Link } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../compnents/Rating'
import Loader from '../compnents/loader'
import Message from '../compnents/Message'
import { listProductDetails, createProductReview } from '../action/productAction'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../compnents/Meta'
import './p.css'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [ratings, setRatings] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successReview, error: errorReview } = productReviewCreate


    useEffect(() => {
        if (successReview) {
            alert('Review Submitted!!!')
            setRatings(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHadler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            ratings,
            comment
        }))
    }


    return (
        <>
            <br /><br />
            {loading ? (<Loader />) : error ? (<Message variant='light'>{error}</Message>) : (
                <>
                    <Meta title={product.name} />
                    <Row>
                        <Col md={4}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>{product.name}</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={product.ratings}
                                        text={`${product.numReviews} reviews `} />
                                    <ListGroup.Item>
                                        <h6><strong>Descripton: </strong>{product.descripton}</h6>
                                    </ListGroup.Item>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3} >
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>₹{product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col className='p'>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)} >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button onClick={addToCartHandler} className='btn-block' type='button' variant='dark' disabled={product.countInStock === 0}>
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                    <ListGroup.Item>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.ratings} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write A Review</h2>
                                    {errorReview && <Message variant='light'>{errorReview}</Message>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHadler}>
                                            <Form.Group controlId='ratings'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={ratings} onChange={(e) => setRatings(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1- Very Poor</option>
                                                    <option value='2'>2-Poor</option>
                                                    <option value='3'>3-Good</option>
                                                    <option value='4'>4-Very Good</option>
                                                    <option value='5'>5-Excelent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control as='textarea' row='4' value={comment} onChange={(e) => setComment(e.target.value)}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Button type='submit' variant='dark'>Submit</Button>
                                        </Form>
                                    ) : (
                                        <Message>Please <Link to='/login'> Sign In </Link> to write a review </Message>)}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}

        </>
    )
}

export default ProductScreen
