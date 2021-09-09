import styles from "./MainHeader.module.css";
import Navigator from "./Navigator";
const MainHeader = (props) => {
    return (
        <header className={styles["main-header"]}>
            <p>Expense Tracker</p>
            <Navigator/>
        </header>
    );
}

export default MainHeader;