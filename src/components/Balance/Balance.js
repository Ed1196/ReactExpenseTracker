import BalanceBar from "./BalanceBar";
import styles from "./Balance.module.css";
const Balance = (props) => {
  let barFillHeight = "100%";
  let colorForVar = "green";
  if (props.balance > 0) {
    let expenses = 100 - Math.round((props.balance / props.maxBalance) * 100);
    if (expenses > 50 && expenses <= 80) {
      colorForVar = "yellow";
    } else if (expenses > 80 && expenses <= 100) {
      colorForVar = "red";
    }
    barFillHeight = expenses + "%";
  }
  return (
    <div className={`${styles.balance} 
                     ${colorForVar === "yellow" && styles.half} 
                     ${colorForVar === "red" && styles.full}`}>
      <BalanceBar
        barFillHeight={barFillHeight}
        balance={props.balance}
        colorForVar={colorForVar}
      />
    </div>
  );
};

export default Balance;
