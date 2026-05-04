import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import {
  Box,
  Popover,
  Slider,
  SwipeableDrawer,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { MouseEvent, useMemo, useState } from "react";
import { useMetronome } from "../../hooks/useMetronome";
import strings from "../../strings.json";
import UtilityActionButton from "./UtilityActionButton";

const drawerHandleStyles = {
  width: 46,
  height: 4,
  borderRadius: "999px",
  background: "rgba(193, 200, 193, 0.9)",
  margin: "0 auto 18px",
} as const;

const sliderSx = {
  mt: 2,
  color: "#3b6934",
  "& .MuiSlider-thumb": {
    width: 18,
    height: 18,
  },
} as const;

const panelContent = (
  helperText: string,
  maxWidth: number | string,
  sliderAriaLabel: string,
  title: string,
  volumeValue: number,
  setVolumeValue: (value: number) => void,
) => (
  <Box sx={{ width: "100%", maxWidth, overflowX: "hidden" }}>
    <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717973" }}>
      {title}
    </Typography>
    <Typography sx={{ mt: 0.75, fontSize: "0.78rem", fontWeight: 600, color: "rgba(85, 97, 88, 0.88)" }}>
      {helperText}
    </Typography>
    <Slider
      aria-label={sliderAriaLabel}
      data-testid="volume-slider"
      min={0}
      max={100}
      step={5}
      value={volumeValue}
      onChange={(_event, value) => {
        setVolumeValue(Array.isArray(value) ? value[0] : value);
      }}
      sx={sliderSx}
    />
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", mt: 0.75, gap: 1 }}>
      <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: "rgba(113, 121, 115, 0.82)" }}>
        Quiet
      </Typography>
      <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: "rgba(113, 121, 115, 0.82)", textAlign: "center" }}>
        {volumeValue}%
      </Typography>
      <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: "rgba(113, 121, 115, 0.82)", textAlign: "right" }}>
        Full
      </Typography>
    </Box>
  </Box>
);

const VolumeControl = () => {
  const { masterVolume, setMasterVolume } = useMetronome();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { helperText, sliderAriaLabel, title, triggerAriaLabel } = strings.metronome.volumeControl;
  const volumeValue = useMemo(() => Math.round(masterVolume * 100), [masterVolume]);
  const icon = volumeValue === 0
    ? <VolumeOffRoundedIcon sx={{ fontSize: 20 }} />
    : <VolumeUpOutlinedIcon sx={{ fontSize: 20 }} />;

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

  const setVolumeValue = (value: number) => {
    setMasterVolume(value / 100);
  };

  return (
    <>
      <Tooltip title={title} placement="top">
        <span>
          <UtilityActionButton
            icon={icon}
            label={strings.metronome.actionLabels.volume}
            active={Math.abs(masterVolume - 0.92) > 0.001}
            onClick={openControl}
            testId="volume-trigger"
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
            "data-testid": "volume-popover",
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
          {panelContent(helperText, 280, sliderAriaLabel, title, volumeValue, setVolumeValue)}
        </Popover>
      ) : (
        <SwipeableDrawer
          anchor="bottom"
          open={drawerOpen}
          onClose={closeControl}
          onOpen={() => setDrawerOpen(true)}
          disableSwipeToOpen
          PaperProps={{
            "data-testid": "volume-drawer",
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
            {panelContent(helperText, "100%", sliderAriaLabel, title, volumeValue, setVolumeValue)}
          </Box>
        </SwipeableDrawer>
      )}
    </>
  );
};

export default VolumeControl;
