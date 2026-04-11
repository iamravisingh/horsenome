import { HTMLAttributes, useState } from "react";
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
  padding: 6px 0 10px;
`;

const brand = css`
  display: flex;
  align-items: center;
  color: #3b6934;
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
      <div className={brand} data-testid="app-brand">
        <Typography
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.45rem", sm: "1.4rem" },
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          Horsenome
        </Typography>
      </div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          open={open}
          disableHoverListener
          disableFocusListener
          disableInteractive
          title={
            <>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 700 }}>
                Quick help
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Tempo slider</b>
                <br />
                Set the BPM.
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>Beat selector</b>
                <br />
                Pick a taal or meter.
              </Typography>
              <Typography variant="body1">
                <b>Start/Stop</b>
                <br />
                Begin or pause playback.
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
          slotProps={{
            popper: {
              disablePortal: true,
            },
            tooltip: {
              ...( { "data-testid": "quick-help-tooltip" } as HTMLAttributes<HTMLDivElement> ),
            },
          }}
        >
          <IconButton
            aria-label="quick help"
            data-testid="quick-help-trigger"
            sx={{
              width: 32,
              height: 32,
              color: "#3b6934",
              "&:hover": {
                backgroundColor: "rgba(59, 105, 52, 0.08)",
              },
            }}
          >
            <HelpOutlineIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </ClickAwayListener>
    </header>
  );
};
