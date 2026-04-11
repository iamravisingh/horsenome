import { HTMLAttributes } from "react";
import { css } from "@linaria/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { DEFAULT_METER_PRESETS, PROTOTYPE_TERTIARY_TEXT } from "./constant";

const mobileSelectorWrap = css`
  width: min(100%, 280px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const mobileCaption = css`
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${PROTOTYPE_TERTIARY_TEXT};
`;

type MobileBeatControlProps = {
  selectedValue: string;
  selectedWesternNotation?: string;
  onPresetSelect: (value: string) => void;
};

const MobileBeatControl = ({
  selectedValue,
  selectedWesternNotation,
  onPresetSelect,
}: MobileBeatControlProps) => {
  return (
    <div className={mobileSelectorWrap}>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          displayEmpty
          onChange={(event: SelectChangeEvent<string>) => onPresetSelect(event.target.value)}
          IconComponent={ExpandMoreIcon}
          aria-label="meter"
          data-testid="mobile-meter-select"
          SelectDisplayProps={
            { "data-testid": "mobile-meter-select-display" } as HTMLAttributes<HTMLDivElement>
          }
          MenuProps={{
            MenuListProps:
              { "data-testid": "mobile-meter-options" } as HTMLAttributes<HTMLUListElement>,
          }}
          sx={{
            borderRadius: "999px",
            backgroundColor: "rgba(165, 216, 152, 0.18)",
            color: "#325f2c",
            fontWeight: 700,
            textAlign: "center",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(59, 105, 52, 0.1)",
            },
            "& .MuiSelect-select": {
              py: 1.5,
              px: 3,
              textAlign: "center",
            },
          }}
        >
          {DEFAULT_METER_PRESETS.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              data-testid={`mobile-meter-option-${option.value}`}
            >
              {option.label}
            </MenuItem>
          ))}
          <MenuItem value="custom" data-testid="mobile-meter-option-custom">Custom</MenuItem>
        </Select>
      </FormControl>
      {selectedWesternNotation ? (
        <Typography className={mobileCaption} data-testid="mobile-meter-caption">
          {selectedWesternNotation}
        </Typography>
      ) : null}
    </div>
  );
};

export default MobileBeatControl;
