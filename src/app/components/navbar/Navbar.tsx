import { AppDispatch } from "@/GlobalContext/Store";
import styles from "./Navbar.module.css"
import 'boxicons/css/boxicons.min.css';
import { useDispatch } from "react-redux";
import { logout } from "@/GlobalContext/Features/Users/userSlice";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = ()=>{
    dispatch(logout());
    router.push("/Login")
  }

  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
           <a href="/">Logo</a>
        </div>
        <div className={styles.rightSection}>
            <ul className={styles.menu}>
                <li><a href="">Tienda</a></li>
                <li><a href="">Sobre Nosotros</a></li>
                <li><a href="">Contáctanos</a></li>
                <li><a href="/Cart"><i className='bx bxs-cart-alt' style={{fontSize: "20px", color: 'white' }}></i></a></li>
                <li><i onClick={handleLogOut} className='bx bx-log-out-circle' style={{fontSize: "20px", color: 'white', cursor: "pointer"}}></i></li>
            </ul>
        </div>
    </div>
  )
}
