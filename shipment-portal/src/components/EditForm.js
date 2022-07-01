import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { update } from "../Api";

export default function FormDialog({ form, setForm, data, setData }) {
  const handleClose = () => {
    setForm(null);
  };
  const handelConfirm = () => {
    // Updating changes to server database
    update(form, (res) => {
      if (res?.ok) {
        //If OK, Reflecting changes back to local/offline/browser data
        let i = data.findIndex((shipment) => shipment._id === form._id);
        let newShipment = [...data];
        newShipment[i] = form;
        // console.log({ newShipment });
        setData(newShipment);

        handleClose();
      }
    });
  };
  return (
    <div>
      <Dialog
        open={form}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Shipment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="editText"
            label="BL Number"
            type="text"
            fullWidth
            // disabled
            value={form?.blnumber}
            onChange={(e) => setForm({ ...form, blnumber: e.target.value })}
          />
          <FormControl fullWidth>
            <InputLabel id="editOption">Status</InputLabel>
            <Select
              labelId="editOption"
              id="demo-simple-select-filled"
              value={form?.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value="Onboard">Onboard</MenuItem>
              <MenuItem value="Arrived Depot">Arrived Depot</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handelConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
