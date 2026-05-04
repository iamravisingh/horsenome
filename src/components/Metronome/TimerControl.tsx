import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import {
  Box,
  Button,
  Popover,
  Slider,
  SwipeableDrawer,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MouseEvent, SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useMetronome } from "../../hooks/useMetronome";
import strings from "../../strings.json";
import UtilityActionButton from "./UtilityActionButton";

const TIMER_MINUTES_MIN = 1;
const TIMER_MINUTES_MAX = 60;
const TIMER_MARKS = [1, 15, 30, 45, 60].map((value) => ({ value, label: String(value) }));

const drawerHandleStyles = {
  width: 46,
  height: 4,
  borderRadius: "999px",
  background: "rgba(193, 200, 193, 0.9)",
  margin: "0 auto 18px",
} as const;

const TimerControl = () => {
  const { sessionDurationMinutes, setSessionDuration } = useMetronome();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draftMinutes, setDraftMinutes] = useState(sessionDurationMinutes ?? 15);
  const {
    durationLabel,
    helperText,
    milestoneHelper,
    minutesSuffix,
    offLabel,
    pickerHelper,
    title,
    triggerAriaLabel,
  } = strings.metronome.timerControl;

  const timerLabel = useMemo(
    () => `${draftMinutes} ${minutesSuffix}`,
    [draftMinutes, minutesSuffix]
  );

  useEffect(() => {
    setDraftMinutes(sessionDurationMinutes ?? 15);
  }, [sessionDurationMinutes]);

  const openControl = (event: MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      setDrawerOpen(true);
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  const closeControl = () => {
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleSelect = (minutes: number | null) => {
    setSessionDuration(minutes);
  };

  const renderPanel = () => (
    <Box
      sx={{ width: "100%", maxWidth: isMobile ? "100%" : 320, overflowX: "hidden" }}
      onMouseDown={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
      onTouchStart={(event) => event.stopPropagation()}
    >
      <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717973" }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 0.75, fontSize: "0.78rem", fontWeight: 600, color: "rgba(85, 97, 88, 0.88)" }}>
        {helperText}
      </Typography>
      <Typography sx={{ mt: 0.35, fontSize: "0.72rem", fontWeight: 700, color: "rgba(59, 105, 52, 0.82)" }}>
        {milestoneHelper}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, mt: 2 }}>
        <Button
          data-testid="timer-off-button"
          onClick={() => handleSelect(null)}
          variant={sessionDurationMinutes === null ? "contained" : "outlined"}
          color="success"
          sx={{ borderRadius: "999px", textTransform: "none", fontWeight: 700 }}
        >
          {offLabel}
        </Button>
        <Box sx={{ textAlign: "right" }}>
          <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#717973" }}>
            {durationLabel}
          </Typography>
          <Typography data-testid="timer-selected-value" sx={{ mt: 0.25, fontSize: "0.92rem", fontWeight: 800, color: "#3b6934" }}>
            {sessionDurationMinutes === null ? offLabel : timerLabel}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2.1, px: 0.6 }}>
        <Slider
          data-testid="timer-slider"
          value={draftMinutes}
          min={TIMER_MINUTES_MIN}
          max={TIMER_MINUTES_MAX}
          step={1}
          marks={TIMER_MARKS}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} ${minutesSuffix}`}
          onChange={(_event, value) => {
            const nextValue = Array.isArray(value) ? value[0] : value;
            setDraftMinutes(nextValue);
          }}
          onChangeCommitted={(_event: Event | SyntheticEvent<Element, Event>, value) => {
            const nextValue = Array.isArray(value) ? value[0] : value;
            setDraftMinutes(nextValue);
            handleSelect(nextValue);
          }}
          sx={{
            color: "#3b6934",
            "& .MuiSlider-markLabel": {
              fontSize: "0.68rem",
              fontWeight: 700,
              color: "rgba(113, 121, 115, 0.94)",
            },
          }}
        />
        <Typography sx={{ mt: 0.8, fontSize: "0.72rem", color: "rgba(85, 97, 88, 0.82)" }}>
          {pickerHelper}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Tooltip title={title} placement="top">
        <span>
          <UtilityActionButton
            icon={<TimerOutlinedIcon sx={{ fontSize: 20 }} />}
            label={strings.metronome.actionLabels.timer}
            active={sessionDurationMinutes !== null}
            onClick={openControl}
            testId="timer-trigger"
            ariaLabel={triggerAriaLabel}
          />
        </span>
      </Tooltip>

      {!isMobile ? (
        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeControl}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "bottom", horizontal: "center" }}
          PaperProps={{
            "data-testid": "timer-menu",
            sx: {
              p: 2,
              width: 320,
              borderRadius: "18px",
              backgroundColor: "rgba(248, 250, 248, 0.94)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(193, 200, 193, 0.26)",
              boxShadow: "0 24px 40px rgba(25, 28, 27, 0.12)",
            },
          }}
        >
          {renderPanel()}
        </Popover>
      ) : (
        <SwipeableDrawer
          anchor="bottom"
          open={drawerOpen}
          onClose={closeControl}
          onOpen={() => setDrawerOpen(true)}
          disableSwipeToOpen
          PaperProps={{
            "data-testid": "timer-drawer",
            sx: {
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              backgroundColor: "#f8faf8",
              px: 0,
              pt: 1.5,
              pb: 3,
            },
          }}
        >
          <Box sx={{ px: 2, overflowX: "hidden" }}>
            <Box sx={drawerHandleStyles} />
            {renderPanel()}
          </Box>
        </SwipeableDrawer>
      )}
    </>
  );
};

export default TimerControl;
