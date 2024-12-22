import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface BeatControlProps {
  beatsPerMeasure: number;
  onChange: (value: number) => void;
}

const BeatControl: FC<BeatControlProps> = ({ beatsPerMeasure, onChange }) => {
  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const val = parseInt(e.target.value as string, 10);
    onChange(val);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Beats per Measure</InputLabel>
      <Select
        value={beatsPerMeasure}
        label="Beats per Measure"
        onChange={handleChange}
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
