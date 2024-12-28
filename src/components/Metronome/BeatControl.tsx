import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import ClapIcon from "../../assets/clapping-hands.svg";
import { useMetronome } from "../../hooks/useMetronome";

const BeatControl = () => {
  const {
    setBeatsPerMeasure,
    beatsPerMeasure
  } = useMetronome();
  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const val = parseInt(e.target.value as string, 10);
    setBeatsPerMeasure(val);
  };

  return (
    <FormControl size="medium">
      <InputLabel
        id="bpm-input"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <img src={ClapIcon} style={{ width: 40, height: 40 }} />
      </InputLabel>
      <Select
        id="bpm-input"
        size="medium"
        value={beatsPerMeasure}
        label="Beats"
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenu-list": { padding: 0 },
              "& .MuiMenuItem-root": { justifyContent: "center", fontSize: 16 },
            },
          },
        }}
      >
        <MenuItem disabled>
          Beats <img src={ClapIcon} style={{ width: 30, height: 30 }} />
        </MenuItem>
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
