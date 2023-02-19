import { Alert, Snackbar } from "@mui/material";
import { AlertType } from "../types/Transactions.types";

interface AlertProps {
  open: boolean;
  onClose: () => void;
  type: AlertType | undefined;
}

export const AlertSnackbar: React.FC<AlertProps> = ({ open, type, onClose }) => {
  const alertText = AlertType.success ? "The operation was successful!" : "The operation failed";

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {alertText}
      </Alert>
    </Snackbar>
  );
};
