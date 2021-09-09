import styles from "./Navigator.module.css";
const Navigator = () => {
    return(
        <nav className={styles.nav}>
            <ul>
                <li>
                    <a href="/">Users</a>
                </li>
                <li>
                    <a href="/">Admin</a>
                </li>
                <li>
                    <a href="/">Logout</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigator;