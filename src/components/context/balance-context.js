import React from "react";

const BalanceContext = React.createContext({
    balance: 0,
    maxBalance: 0,
});

export default BalanceContext