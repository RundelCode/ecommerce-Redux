'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/GlobalContext/Store";
import { useEffect, useState } from "react";
import { logout } from "@/GlobalContext/Features/Users/userSlice";
import { useRouter } from "next/navigation";
import { getproducts, searchProducts } from "@/GlobalContext/Features/Products/productSlice";
import Navbar from "./components/navbar/Navbar";
import 'boxicons/css/boxicons.min.css';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number
}


export default function Home() {

  const state = useSelector((state: RootState) => state.userReducer.user);
  const [email, setEmail] = useState("")
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter();
  const products = useSelector((state: RootState) => state.productReducer.products as Product[]);
  const isLoading = useSelector((state: RootState) => state.productReducer.loading)

  useEffect(() => {
    dispatch(getproducts())
  }, [])

  const handleDetails = (productId: number)=>{
    router.push(`/Product/${productId}`)
  }

  const handleSearch = (inputValue: string)=>{
    console.log(inputValue)
    dispatch(searchProducts(inputValue))
  }

  return (
    <main className={styles.main}>
      <Navbar></Navbar>
      <div className={styles.search}>
        <input onChange={(e)=> handleSearch(e.target.value)} type="text" name="SearchProducts" className={styles.searchInput} placeholder="¿Que producto deseas buscar?"/>
        <button className={styles.searchButton}><i className='bx bxs-search'></i> Buscar</button>
      </div>
      <p className={styles.founded}>{products.length} productos encontrado</p>
      {isLoading ? (
        <div className={styles.charging}>
          <h2>Cargando productos...</h2>
          <span className={styles.loader}></span>
        </div>
      ) : (
        <div className={styles.productsContainer}>
          {products.map(product => {
            return (
              <div className={styles.productCard}>
                <div className={styles.imgContainer}><img src={product.thumbnail} alt={product.title} /></div>
                <p className={styles.productTitle}>{product.title}</p>
                <p>${product.price}</p>
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
                <button onClick={()=> handleDetails(product.id)} className={styles.seeMoreInfo}>Ver mas</button>
              </div>
            )
          })}
        </div>
      )}
    </main>
  );
}
