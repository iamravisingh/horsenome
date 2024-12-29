import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { css } from "@linaria/core";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ClapIcon from "../../assets/clapping-hands.svg";
import Tooltip from "@mui/material/Tooltip";
import { useMetronome } from "../../hooks/useMetronome";

const beatsContainer = css`
  display: flex;
  gap: 1px;
  width: 25%;
  align-items: end;
  justify-content: flex-end;
`;

const BeatControl = () => {
  const { setBeatsPerMeasure, beatsPerMeasure } = useMetronome();
  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const val = parseInt(e.target.value as string, 10);
    setBeatsPerMeasure(val);
  };

  return (
    <div className={beatsContainer}>
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
                "& .MuiMenuItem-root": {
                  justifyContent: "center",
                  fontSize: 16,
                },
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
      <Tooltip
        title={
          <Typography variant="body2">
            "Beats per measure" determines how many beats occur in each measure
            of the music. For example, in 4/4 time, there are 4 beats per
            measure.
          </Typography>
        }
        arrow
        placement="top"
      >
        <IconButton aria-label="Beats per measure help">
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default BeatControl;
