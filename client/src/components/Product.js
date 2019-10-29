import React from 'react';

const Product = (props) => {
const {title,description,price} = props.product
  //this is where a single product will be displayed 
  return (
    <div>
      <h1>{title}</h1>
        <p>{description}</p>
        <p>{price}</p>
    </div>
  );
};

export default Product;