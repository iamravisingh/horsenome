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
import strings from "../../strings.json";

const RhythmSelector = () => {
  const [open, setOpen] = useState(false);
  const { cancelLabel, confirmLabel, options, title } = strings.rhythmSelector;
  const [selectedRhythm, setSelectedRhythm] = useState(options[0]);

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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <FormControl>
            <RadioGroup value={selectedRhythm} onChange={handleRhythmChange}>
              {options.map((option) => (
                <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>{cancelLabel}</Button>
          <Button onClick={handleConfirm} color="primary">
            {confirmLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RhythmSelector;
