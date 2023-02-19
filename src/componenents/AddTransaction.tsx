import { Button, Grid, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Transaction } from "../types/Transactions.types";
import classes from "./AddTransaction.module.css";

interface AddTransactionProps {
  onChange: (newTransaction: Transaction) => void;
  value: string;
}

export const AddTransaction: React.FC<AddTransactionProps> = ({ onChange, value }) => {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [account, setAccount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isFormCompleted, setisFormCompleted] = useState<boolean>(false);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAmount(val);
  };

  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleDescritionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const cleanForm = () => {
    setAmount(NaN);
    setAccount("");
    setAddress("");
    setDescription("");
  };

  const handleSubmit = () => {
    const today = new Date();
    onChange({
      amount: amount,
      beneficiary: "Jan Kowalski",
      account: account,
      address: address,
      date: today.toISOString(),
      description: description,
    });
    cleanForm();
  };

  const handleCancel = () => {
    cleanForm();
  };

  useEffect(() => {
    setisFormCompleted(amount !== null && account !== "" && address !== "" && description !== "");
  }, [amount, account, address, description]);

  return (
    <>
      <Typography variant="h6">Add a new transaction</Typography>
      <Grid item xs={12} className={classes.inputFields}>
        <TextField
          id="amount"
          label="Amount"
          type="number"
          variant="standard"
          value={amount}
          onChange={handleAmountChange}
          required
          inputProps={{
            min: 1,
            style: {
              width: "450px",
            },
          }}
        />
        <TextField
          id="account"
          label="Account number"
          type="text"
          variant="standard"
          value={account}
          onChange={handleAccountChange}
          required
          inputProps={{
            style: {
              width: "450px",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} className={classes.inputFields}>
        <TextField
          id="address"
          label="Address"
          variant="standard"
          value={address}
          onChange={handleAddressChange}
          required
          inputProps={{
            style: {
              width: "450px",
            },
          }}
        />
        <TextField
          id="description"
          label="Description"
          variant="standard"
          value={description}
          onChange={handleDescritionChange}
          required
          inputProps={{
            style: {
              width: "450px",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} className={classes.buttonsRow}>
        <Button variant="outlined" onClick={handleCancel} className={classes.button}>
          Cancel
        </Button>
        <Button variant="contained" disabled={!isFormCompleted} onClick={handleSubmit} className={classes.button}>
          Submit
        </Button>
      </Grid>
    </>
  );
};
