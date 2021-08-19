import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const titleChangedHandler = (event) => {
    setInvalidTitle(false);
    setEnteredTitle(event.target.value);
  };
  const [enteredAmount, setEnteredAmount] = useState("");
  const amountChangedHandler = (event) => {
    setInvalidAmount(false);
    setEnteredAmount(event.target.value);
  };
  const [enteredDate, setEnteredDate] = useState("");
  const dateChangedHandler = (event) => {
    setInvalidDate(false);
    setEnteredDate(event.target.value);
  };
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredTitle.trim().length === 0) {
      setInvalidTitle(true);
    }
    console.log(enteredAmount);
    if (enteredAmount === "" || enteredAmount < 0) {
      setInvalidAmount(true);
    }
    const currDate = new Date(enteredDate);
    if (isNaN(currDate.getTime())) {
      setInvalidDate(true);
    }
    if (!invalidTitle && !invalidAmount && !invalidDate) {
      const expenseData = {
        title: enteredTitle,
        amount: +enteredAmount,
        date: new Date(enteredDate),
      };
      props.onSaveExpenseData(expenseData);
      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={`${styles["new-expense__control"]}`}>
        <div
          className={`${styles["new-expense__control"]} ${
            invalidTitle && styles.invalid
          }`}
        >
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangedHandler}
          />
        </div>
      </div>
      <div className={`${styles["new-expense__control"]}`}>
        <div className={`${styles["new-expense__control"]} ${invalidAmount && styles.invalid}`}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangedHandler}
          />
        </div>
      </div>
      <div className={`${styles["new-expense__control"]}`}>
        <div className={`${styles["new-expense__control"]} ${invalidDate && styles.invalid}`}>
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangedHandler}
          />
        </div>
      </div>
      <div className={`${styles["new-expense__actions"]}`}>
        <button type="submit">Add Expense</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
