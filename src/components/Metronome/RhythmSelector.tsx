import React, { useState } from "react";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
// import Grid from "@mui/material/Grid2";

const RhythmSelector = () => {
  const [open, setOpen] = useState(false);
  const [selectedRhythm, setSelectedRhythm] = useState("4/4");

  const handleChipClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const handleRhythmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRhythm(event.target.value);
  };

  const handleConfirm = () => {
    setOpen(false);
    // Additional logic to update rhythms in the application
    console.log("Rhythm selected:", selectedRhythm);
  };

  return (
    <>
      <Chip
        label={selectedRhythm}
        onClick={handleChipClick}
        color="primary"
        style={{ cursor: "pointer" }}
      />

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Select Rhythm</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup value={selectedRhythm} onChange={handleRhythmChange}>
              <FormControlLabel value="4/4" control={<Radio />} label="4/4" />
              <FormControlLabel value="3/4" control={<Radio />} label="3/4" />
              <FormControlLabel value="6/8" control={<Radio />} label="6/8" />
              <FormControlLabel value="7/8" control={<Radio />} label="7/8" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RhythmSelector;
