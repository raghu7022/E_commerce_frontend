import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'



const BundleScreen = ({ history }) => {


    const [products, setProducts] = useState();

    const addToCartHandler = () => {
        history.push(`/cart/614837beec46e4181814aa16?qty=1&type=bundle`)
    }

    useEffect(() => {

        const getBundle = async () => {
            const { data } = await axios.get(`/api/bundle/616a7f201623ba0938d1757d`)
            const { products } = data

            setProducts(products)
        }
        getBundle();
    }, [])

    return (
        <div>
            <h1>Bundle</h1>
            {products && (
                <div>
                    {products.map((product, index) => (
                        <div key={index}>
                            <h2>Product Id: {product.productId}</h2>
                        </div>
                    ))}
                </div>
            )}
            <Button variant='dark' onClick={addToCartHandler}> Add To Cart</Button>
        </div>
    )
}

export default BundleScreen
