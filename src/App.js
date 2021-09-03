import React, { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import ErrorModal from "./components/UI/ErrorModal";
const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 95.12,
    date: new Date(2020, 7, 14),
  },
  {
    id: "e2",
    title: "New TV",
    amount: 799.49,
    date: new Date(2021, 2, 12),
  },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];
let CURRENT_EXPENSES = 0;
DUMMY_EXPENSES.forEach((arrayItem) => {
  CURRENT_EXPENSES += arrayItem.amount;
});

const STARTING_BALANCE = 4000;
const App = () => {
  const [balance, updateBalance] = useState(
    STARTING_BALANCE - CURRENT_EXPENSES
  );
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [error, setError] = useState("");
  const addExpenseHandler = (expense) => {
    if (balance - expense.amount < 0) {
      setError({
        title: "Insufficient Funds.",
        message: "Please enter a valid expense or remove another one.",
      });
    } else {
      updateBalance((prevBalance) => {
        return prevBalance - expense.amount;
      });
      setExpenses((prevExpenses) => {
        return [expense, ...prevExpenses];
      });
      console.log(expenses);
    }
  };

  const closeErrorHandler = () => {
    setError("");
  };
  return (
    <React.Fragment>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses
        items={expenses}
        balance={balance}
        maxBalance={STARTING_BALANCE}
      />
      {error && (
        <ErrorModal
          onConfirm={closeErrorHandler}
          title={error.title}
          message={error.message}
        />
      )}
    </React.Fragment>
  );
};

export default App;
