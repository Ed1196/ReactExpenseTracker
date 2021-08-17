import BalanceBar from "./BalanceBar";
import "./Balance.css";
const Balance = (props) => {
  return (
    <div className="balance">
      <BalanceBar balance={props.balance} maxBalance={props.maxBalance} />
    </div>
  );
};

export default Balance;
