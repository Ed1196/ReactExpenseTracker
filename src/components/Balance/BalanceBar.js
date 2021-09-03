import styles from "./BalanceBar.module.css";

const BalanceBar = (props) => {
  return (
    <div className={styles["balance-bar"]}>
      <div className={`${styles["balance-bar__inner"]}
                        ${props.colorForVar === "yellow" && styles.half}
                        ${props.colorForVar === "red" && styles.full}`}>
        <div
          className={`${styles["balance-bar__fill"]} 
                      ${props.colorForVar === "yellow" && styles.half} 
                      ${props.colorForVar === "red" && styles.full}`}
          style={{ height: props.barFillHeight }}
        ></div>
      </div>
      <div>$:{Math.round(props.balance)}</div>
    </div>
  );
};

export default BalanceBar;
