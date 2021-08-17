import React from "react";
import ChartBar from "./ChartBar";
import Balance from "../Balance/Balance";
import "./Chart.css";

const Chart = (props) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);
  return (
    <div className="flexbox-container">
      <div className="chart">
        {props.dataPoints.map((dataPoint) => (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMaximum}
            label={dataPoint.label}
          />
        ))}
      </div>
      <Balance
        balance={props.balance}
        maxBalance={props.maxBalance}
      />
    </div>
  );
};

export default Chart;
