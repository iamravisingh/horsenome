import { useMemo, useState } from "react";
import { css } from "@linaria/core";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import {
  Box,
  Drawer,
  IconButton,
  ListItemButton,
  ListItemText,
  Menu,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMetronome } from "../../hooks/useMetronome";
import { RHYTHM_OPTIONS, RhythmMode } from "./constant";

const triggerWrap = css`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 20;

  @media (min-width: 601px) {
    right: 28px;
    bottom: 28px;
  }
`;

const drawerHandle = css`
  width: 46px;
  height: 4px;
  border-radius: 999px;
  background: rgba(193, 200, 193, 0.9);
  margin: 0 auto 18px;
`;

const drawerBody = css`
  padding: 12px 16px 24px;
`;

const optionText = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const getRhythmIcon = (mode: RhythmMode) => {
  switch (mode) {
    case "duple":
      return <LooksTwoIcon sx={{ fontSize: 18 }} />;
    case "triplet":
      return <Looks3Icon sx={{ fontSize: 18 }} />;
    case "quad":
      return <Looks4Icon sx={{ fontSize: 18 }} />;
    case "swing":
      return <ShowChartRoundedIcon sx={{ fontSize: 18 }} />;
    case "off":
    default:
      return <HorizontalRuleRoundedIcon sx={{ fontSize: 18 }} />;
  }
};

const RhythmControl = () => {
  const { rhythmMode, setRhythmMode } = useMetronome();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const selectedLabel = useMemo(
    () => RHYTHM_OPTIONS.find((option) => option.value === rhythmMode)?.label ?? "Off",
    [rhythmMode]
  );

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      setDrawerOpen(true);
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDrawerOpen(false);
  };

  const handleSelect = (value: RhythmMode) => {
    setRhythmMode(value);
    handleClose();
  };

  return (
    <div className={triggerWrap}>
      <Tooltip title="Rhythm settings" placement="left">
        <IconButton
          aria-label="rhythm settings"
          onClick={handleOpen}
          sx={{
            width: 56,
            height: 56,
            borderRadius: "18px",
            color: "#3b6934",
            backgroundColor: "rgba(242, 244, 242, 0.92)",
            border: "1px solid rgba(193, 200, 193, 0.32)",
            boxShadow: "0 18px 34px rgba(25, 28, 27, 0.08)",
            backdropFilter: "blur(12px)",
            "&:hover": {
              backgroundColor: "rgba(230, 233, 231, 0.96)",
            },
          }}
        >
          <EqualizerRoundedIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={!isMobile && Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 250,
              mt: -1,
              ml: -1,
              p: 1,
              borderRadius: "18px",
              backgroundColor: "rgba(248, 250, 248, 0.92)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(193, 200, 193, 0.26)",
              boxShadow: "0 24px 40px rgba(25, 28, 27, 0.12)",
            },
          },
        }}
      >
        {RHYTHM_OPTIONS.map((option) => {
          const selected = option.value === rhythmMode;
          return (
            <ListItemButton
              key={option.value}
              selected={selected}
              onClick={() => handleSelect(option.value)}
              sx={{
                borderRadius: "14px",
                mb: 0.5,
                px: 1.5,
                py: 1.25,
                alignItems: "center",
                "&.Mui-selected": {
                  backgroundColor: "rgba(165, 216, 152, 0.22)",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "rgba(165, 216, 152, 0.3)",
                },
              }}
            >
              <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                <span className={optionText}>
                  <Typography sx={{ fontSize: "0.92rem", fontWeight: 700, color: "#191c1b" }}>
                    {option.label}
                  </Typography>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(85, 97, 88, 0.88)" }}>
                    {option.caption}
                  </Typography>
                </span>
                <Box sx={{ color: selected ? "#3b6934" : "rgba(113, 121, 115, 0.82)", display: "flex", alignItems: "center" }}>
                  {getRhythmIcon(option.value)}
                </Box>
              </Box>
            </ListItemButton>
          );
        })}
      </Menu>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            backgroundColor: "#f8faf8",
            px: 0,
          },
        }}
      >
        <div className={drawerBody}>
          <div className={drawerHandle} />
          <Typography sx={{ px: 1.5, pb: 1.5, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#717973" }}>
            Rhythm
          </Typography>
          {RHYTHM_OPTIONS.map((option) => {
            const selected = option.value === rhythmMode;
            return (
              <ListItemButton
                key={option.value}
                selected={selected}
                onClick={() => handleSelect(option.value)}
                sx={{
                  borderRadius: "16px",
                  mb: 0.75,
                  px: 1.5,
                  py: 1.35,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(165, 216, 152, 0.22)",
                  },
                }}
              >
                <ListItemText
                  primary={option.label}
                  secondary={option.caption}
                  primaryTypographyProps={{
                    fontSize: "0.96rem",
                    fontWeight: 700,
                    color: "#191c1b",
                  }}
                  secondaryTypographyProps={{
                    fontSize: "0.74rem",
                    fontWeight: 600,
                    color: "rgba(85, 97, 88, 0.88)",
                  }}
                />
                <Box sx={{ color: selected ? "#3b6934" : "rgba(113, 121, 115, 0.82)", display: "flex", alignItems: "center", pl: 1.5 }}>
                  {getRhythmIcon(option.value)}
                </Box>
              </ListItemButton>
            );
          })}
        </div>
      </Drawer>

      <Typography
        sx={{
          position: "absolute",
          right: 64,
          bottom: 16,
          display: { xs: "none", md: "block" },
          fontSize: "0.64rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(113, 121, 115, 0.82)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {selectedLabel}
      </Typography>
    </div>
  );
};

export default RhythmControl;
