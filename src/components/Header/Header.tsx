import { useState } from "react";
import { css } from "@linaria/core";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";

const headerContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };
  return (
    <header className={headerContainer}>
      <span>Horsenome</span>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          open={open}
          arrow
          disableHoverListener
          disableFocusListener
          disableInteractive
          title={
            <>
              <Typography variant="body1" gutterBottom>
                <b>BPM Slider:</b> Adjust tempo (10-240 BPM)
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Beat Dropdown:</b> Set number of beats per measure
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Rhythm Chip:</b> Choose predefined patterns (2/4, 3/4, 4/4,
                6/8, 7/8, etc.) or create custom accent patterns
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Beat Indicator:</b> Visual display shows current beat and
                accent pattern
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Start/Stop Button:</b> Control metronome playback
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                Blue beats = accented (strong), Gray beats = regular (weak)
              </Typography>
            </>
          }
          onClick={handleTooltipOpen}
          onTouchStart={(e) => {
            e.preventDefault(); // Prevent unintended events
            handleTooltipOpen();
          }}
          onDoubleClick={() => setOpen(!open)}
          onMouseLeave={handleTooltipClose}
        >
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </header>
  );
};
