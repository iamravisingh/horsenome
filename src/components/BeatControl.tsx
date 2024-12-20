import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface BeatControlProps {
  beatsPerMeasure: number;
  onChange: (value: number) => void;
}

const BeatControl: FC<BeatControlProps> = ({ beatsPerMeasure, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Beats per Measure</InputLabel>
      <Select
        value={beatsPerMeasure}
        label="Beats per Measure"
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
      >
        {Array.from({ length: 16 }, (_, i) => i + 1).map((beat) => (
          <MenuItem key={beat} value={beat}>
            {beat}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BeatControl;
