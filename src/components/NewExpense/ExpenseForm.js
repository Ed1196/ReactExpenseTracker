import React, { useReducer, useState } from "react";
import styles from "./ExpenseForm.module.css";

const titleReducer = (state, action) => {
  if(action.type === "USER_INPUT") {
    return {value: action.val, isValid: action.val.trim().length !== 0};
  }
  if(action.type === "FORM_SUBMIT") {
    return {value: state.value, isValid: false}
  }
  if(action.type === "RESET") {
    return {value: "", isValid: true}
  }
  return {value: "", isValid: false};
}

const amountReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    let temp = true;
    if(action.val === "" || action.val < 0) {
      temp = false;
    }
    return { value: action.val, isValid: temp };
  }
  if (action.type === "FORM_SUBMIT") {
    return { value: state.value, isValid: false };
  }
  if (action.type === "RESET") {
    return { value: "", isValid: true };
  }
  return { value: "", isValid: false };
};

const ExpenseForm = (props) => {
  
  const [enteredDate, setEnteredDate] = useState("");
  const dateChangedHandler = (event) => {
    setInvalidDate(false);
    setEnteredDate(event.target.value);
  };
  const [invalidDate, setInvalidDate] = useState(false);

  const [titleState, dispatchTitle] = useReducer(titleReducer, {value: "", isValid: true})
  const titleChangedHandler = (event) => {
    dispatchTitle({ type: "USER_INPUT", val: event.target.value });
  };
  const [amountState, dispatchAmount] = useReducer(amountReducer, {value: "", isValid: true})
  const amountChangedHandler = (event) => {
    dispatchAmount({ type: "USER_INPUT", val: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatchTitle({ type: "USER_INPUT", val: titleState.value });
    if (!titleState.isValid) {
      dispatchTitle({type: "FORM_SUBMIT"})
      return;
    }
    dispatchAmount({ type: "USER_INPUT", val: amountState.value });
    if (!amountState.isValid) {
      dispatchAmount({ type: "FORM_SUBMIT" });
      return;
    }
    const currDate = new Date(enteredDate);
    if (isNaN(currDate.getTime())) {
      setInvalidDate(true);
      return;
    }
    if (titleState.isValid && amountState.isValid && !invalidDate) {
      const expenseData = {
        title: titleState.value,
        amount: +amountState.value,
        date: new Date(enteredDate),
      };
      props.onSaveExpenseData(expenseData);
      dispatchTitle({ type: "RESET"});
      dispatchAmount({ type: "RESET" });
      setEnteredDate("");
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className={`${styles["new-expense__control"]}`}>
        <div
          className={`${styles["new-expense__control"]} ${
            !titleState.isValid && styles.invalid
          }`}
        >
          <label>Title</label>
          <input
            type="text"
            value={titleState.value}
            onChange={titleChangedHandler}
          />
        </div>
      </div>
      <div className={`${styles["new-expense__control"]}`}>
        <div className={`${styles["new-expense__control"]} ${!amountState.isValid && styles.invalid}`}>
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amountState.value}
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
