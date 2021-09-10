import styles from "./BalanceBar.module.css";
import React, { useContext } from "react";
import BalanceContext from "../context/balance-context";

const BalanceBar = (props) => {
  const ctx = useContext(BalanceContext);
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
      <div>$:{Math.round(ctx.balance)}</div>
    </div>
  );
};

export default BalanceBar;
