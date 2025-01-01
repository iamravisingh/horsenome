import { useState } from "react";
import { css } from "@linaria/core";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ClickAwayListener from '@mui/material/ClickAwayListener';

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
                <p>Use the "Slider" to adjust BPM (Beats Per Minute).</p>
                <p>Use the "Dropdown" to set the beat pattern.</p>
                <p>Click the "Start/Stop" button to control playback.</p>
            </>
            }
            onClick={handleTooltipOpen}
            onTouchStart={(e) => {
            e.preventDefault(); // Prevent unintended events
            handleTooltipOpen();
            }}
            onDoubleClick={() => setOpen(!open)}
        >
            <IconButton>
            <HelpOutlineIcon />
            </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </header>
  );
};
