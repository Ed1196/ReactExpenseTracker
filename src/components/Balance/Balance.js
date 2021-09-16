import BalanceBar from "./BalanceBar";
import styles from "./Balance.module.css";
import BalanceContext from "../context/balance-context";
import React, { useContext } from "react";
const Balance = (props) => {
  const ctx = useContext(BalanceContext);
  let barFillHeight = "100%";
  let colorForVar = "green";
  if (ctx.balance > 0) {
    console.log("Balance re-evaluated!")
    let expenses = 100 - Math.round((ctx.balance / ctx.maxBalance) * 100);
    if (expenses > 50 && expenses <= 80) {
      colorForVar = "yellow";
    } else if (expenses > 80 && expenses <= 100) {
      colorForVar = "red";
    }
    barFillHeight = expenses + "%";
  }
  return (
    <div
      className={`${styles.balance} 
                     ${colorForVar === "yellow" && styles.half} 
                     ${colorForVar === "red" && styles.full}`}
    >
      <BalanceBar barFillHeight={barFillHeight} colorForVar={colorForVar} />
    </div>
  );
};

export default React.memo(Balance);
