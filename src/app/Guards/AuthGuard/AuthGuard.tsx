'use client'

import { RootState } from "@/GlobalContext/Store"
import { useSelector } from "react-redux"
import styles from './AuthGuard.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"



const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const user = useSelector((state: RootState) => state.userReducer.user);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkUser = async ()=>{
            if (user && user.id) {
                setIsLoading(false);
            }
            else {
                setIsLoading(false)
                router.push("/Login")
            }
        }
        checkUser();
    }, [user, router])

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return <>{children}</>;
}

export default AuthGuard;