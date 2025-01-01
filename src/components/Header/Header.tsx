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
                Use the <b>Slider</b> to adjust BPM (Beats Per Minute).
              </Typography>
              <Typography variant="body1" gutterBottom>
                Use the <b>Dropdown</b> to set the beat pattern.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Click the <b>Start/Stop</b> button to control playback.
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
