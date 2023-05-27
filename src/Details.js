import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';
import './index.css';
import './ProductRow.css';

function Details() {
  const [product, setProduct] = useState({});
  let { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(value => value.json())
      .then(value => {
        setProduct(value);
      });
  }, [id]);

  return (
    <div>
      <Link to={`/`}>
        <button className='detailsBtn'>Go back to main page</button>
      </Link>
      <h1>{product.title}</h1>
      <img src={product.image} alt='productPhoto' className='productPicture' />
      Lorem ipsum dolor sit amet. {id}
    </div>
  );
}

export default Details;
