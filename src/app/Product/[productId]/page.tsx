'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/GlobalContext/Store';
import { getproductById } from '@/GlobalContext/Features/Products/productSlice';
import Navbar from '@/app/components/navbar/Navbar';
import styles from './product.module.css'
import { addItem } from '@/GlobalContext/Features/Cart/CartSlice';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number,
  images: [],
  brand: string,
  tags: [],
  discountPercentage: number
}


const Product = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch()
  const productId = params.productId || 0;
  const product = useSelector((state: RootState) => state.productReducer.product as Product)
  const isLoading = useSelector((state: RootState) => state.productReducer.loading)


  useEffect(() => {
    handleFetchProduct();
  }, [])

  if (!params.productId) {
    return <div>Loading...</div>;
  }

  const handleFetchProduct = () => {
    dispatch(getproductById(productId.toString()));
  };

  const handleAddToCart = () => {
    dispatch(addItem(product))
  }


  return (
    <main>
      <Navbar></Navbar>
      {isLoading ? (
        <div className={styles.loading}>
          <h2>Cargando el producto...</h2>
          <span className={styles.loader}></span>
        </div>
      ) : (
        <div className={styles.productContainer}>
          <div className={styles.leftContainer}>
            <img className={styles.productImage} src={product.thumbnail} alt="" />
          </div>
          <div className={styles.rightContainer}>
          {product.tags? (
              <div className={styles.tags}>
              {product.tags.map(tag => {
                return (
                  <p className={styles.tag}>{tag}</p>
                )
              })}
            </div>
            ):(
              <></>
            )}
            <h1>{product.title}</h1>
            <p>From {product.brand}</p>
            <div className={styles.starContainer}>
              {product.rating >= 4.5 ? (
                <>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                </>
              ) : product.rating >= 3.5 ? (
                <>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bx-star'></i>
                </>
              ) : product.rating >= 2.5 ? (
                <>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                </>
              ) : product.rating >= 1.5 ? (
                <>
                  <i className='bx bxs-star'></i>
                  <i className='bx bxs-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                </>
              ) : product.rating >= 0.5 ? (
                <>
                  <i className='bx bxs-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                </>
              ) : (
                <>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                  <i className='bx bx-star'></i>
                </>
              )}
            </div>
            <h2>${product.price}</h2>
            <h4>Descuento: %{product.discountPercentage}</h4>
            <p>{product.description}</p>
            <div>
              <p>Cantidad: </p>
              <input type="number" name="quantity" className={styles.quantityInput} defaultValue={1}/>
            </div>
            <button onClick={handleAddToCart} className={styles.cartButton}><i className='bx bxs-cart-alt' style={{ fontSize: "20px", color: 'white' }}></i> Agregar al carrito</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Product;
