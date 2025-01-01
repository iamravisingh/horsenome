// import { useState } from "react";
import { css } from "@linaria/core";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ClapIcon from "../../assets/clapping-hands.svg";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useMetronome } from "../../hooks/useMetronome";

const beatsContainer = css`
  gap: 10px;
  align-items: end;
`;

const BeatControl = () => {
  const { setBeatsPerMeasure, beatsPerMeasure } = useMetronome();
  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const val = parseInt(e.target.value as string, 10);
    setBeatsPerMeasure(val);
  };

  return (
    <Grid container className={beatsContainer} justifyContent={"end"}>
      <Grid>
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
            input={<OutlinedInput label="Beats" />}
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
      </Grid>
    </Grid>
  );
};

export default BeatControl;
