'use client'
import React, { ChangeEvent, use, useEffect, useState } from 'react';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/GlobalContext/Store';
import { login } from '@/GlobalContext/Features/Users/userSlice';
import { useRouter } from 'next/navigation';

//Sincere@april.biz
//Bret

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const router = useRouter();
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {

    }, [])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const resultAction = await dispatch(login({ email, password })).unwrap();
            router.push("/");
        } catch (err) {
            setError(`${err}`);
        }
    };

    return (
        <main className={styles.main}>
            <div className={styles.login}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h2>Inicio de sesión</h2>
                    <div className={styles.formRow}>
                        <p>Correo</p>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type='email' placeholder='Correo electronico' required />
                    </div>
                    <div className={styles.formRow}>
                        <p>Contraseña</p>
                        <input onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type='password' placeholder='Contraseña' required />
                    </div>
                    <button type='submit' className={styles.sendButton}>INICIA SESIÓN</button>
                    {error ? (<p>{error}</p>): <></>}
                    <p>Aun no tienes una cuenta? <a href="/Register">Registrate</a></p>
                </form>
            </div>
        </main>
    )
}
