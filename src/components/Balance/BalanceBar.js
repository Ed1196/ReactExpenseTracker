import "./BalanceBar.css";

const BalanceBar = (props) => {
  let barFillHeight = "100%";
  if (props.balance > 0) {
    let expenses = 100 - Math.round((props.balance / props.maxBalance) * 100);
    barFillHeight = expenses + "%";
  }
  return (
    <div className="balance-bar">
      <div className="balance-bar__inner">
        <div
          className="balance-bar__fill"
          style={{ height: barFillHeight }}
        ></div>
      </div>
      <div>$:{Math.round(props.balance)}</div>
    </div>
  );
};

export default BalanceBar;
