'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/GlobalContext/Store';
import { login } from '@/GlobalContext/Features/Users/userSlice';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [error, setError] = useState("")
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.userReducer.user)

    useEffect(() => {

    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
            router.push("/");
        } catch (error) {
            setError("Error en el inicio de sesión");
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.register}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h2>Registrate</h2>
                    <div className={styles.formRow}>
                        <p>Correo</p>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type='email' placeholder='Correo electronico' required />
                    </div>
                    <div className={styles.formRow}>
                        <p>Contraseña</p>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type='password' placeholder='Password' required />
                    </div>
                    <div className={styles.formRow}>
                        <p>Confirma la contraseña</p>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type='password' placeholder='Password' required />
                    </div>
                    <button type='submit' className={styles.sendButton}>REGISTRATE</button>
                    <p>Ya tienes una cuenta? <a href="/Login">Inicia sesión</a></p>
                </form>
            </div>
        </main>
    )
}
