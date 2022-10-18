import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const Product = ({product}) => {
  return (
    <Card  className="my-3 p-3 rounded" >
      <Link to={`/product/${product._id}`} >
      <Card.Img  src={product.image} variant='top' />
      </Link>
    
    <Card.Body>
    <Link to={`/product/${product._id}`} >
    <Card.Title  as='div'><strong>{product.name}</strong></Card.Title>
    </Link>

    <Card.Text as='div'>
    <Rating
    value={product.rating}
    text={`${product.numReviews} review`}
   color='yellow'
    />
    </Card.Text>
    

    <Card.Text as='h4'>
    ${product.price}
    </Card.Text>
    
    
    </Card.Body>
    </Card>
    )
}

export default Product
// <div className='my-3' >
// {product.rating} from {product.numReviews} reviews
// </div>