'use client'
import { useDispatch, useSelector } from 'react-redux'
import styles from './cart.module.css'
import { AppDispatch, RootState } from '@/GlobalContext/Store'
import { addItem, getFromCookies, removeItem, removeOne, updatePrice } from '@/GlobalContext/Features/Cart/CartSlice'
import { useEffect } from 'react'


interface Items {
    id: number,
    title: string,
    price: number,
    quantity: number
}


const Cart = () => {

    const item = {
        id: 2,
        title: "Prueba",
        price: 100000,
        quantity: 1
    }
    const cartItems = useSelector((state: RootState) => state.CartReducer.items as Items[])
    const totalPrice = useSelector((state: RootState) => state.CartReducer.totalPrice)
    const isLoading = useSelector((state: RootState) => state.CartReducer.loading)

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(getFromCookies());
        dispatch(updatePrice())
    }, [])

    const handleAddItem = () => {
        dispatch(addItem(item))
        dispatch(updatePrice())
    }
    const handleRemoveOneItem = () => {
        dispatch(removeOne(item.id))
        dispatch(updatePrice())
    }
    const handleRemoveItem = () => {
        dispatch(removeItem(item.id))
        dispatch(updatePrice())
    }


    return (
        <main className={styles.cart}>
            {isLoading ? (
                <div>Cargando...</div>
            ) : (
                <div>
                    {cartItems.length > 0 ? (
                        <div>
                            {cartItems.map(item => {
                                return (
                                    <div>
                                        <p>{item.id}</p>
                                        <p>{item.title}</p>
                                        <p>{item.price}</p>
                                        <p>{item.quantity}</p>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div>
                            No hay nada en el carrito
                        </div>
                    )}
                    <p>Total = {totalPrice}</p>
                </div>
            )}
            <button onClick={handleAddItem}>Agregar</button>
            <button onClick={handleRemoveOneItem}>Eliminar 1</button>
            <button onClick={handleRemoveItem}>Eliminar</button>
        </main>
    )
}

export default Cart;