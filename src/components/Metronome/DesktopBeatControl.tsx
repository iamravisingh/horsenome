import AddIcon from "@mui/icons-material/Add";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { css } from "@linaria/core";
import { DEFAULT_METER_PRESETS, PROTOTYPE_TERTIARY_TEXT } from "./constant";

const chipRow = css`
  justify-content: center;
  flex-wrap: wrap;
`;

type DesktopBeatControlProps = {
  selectedValue: string;
  showCustom: boolean;
  onPresetSelect: (value: string) => void;
  onToggleCustom: () => void;
};

const DesktopBeatControl = ({
  selectedValue,
  showCustom,
  onPresetSelect,
  onToggleCustom,
}: DesktopBeatControlProps) => {
  return (
    <Stack direction="row" spacing={1.5} useFlexGap className={chipRow} aria-label="meter">
      {DEFAULT_METER_PRESETS.map((option) => (
        <Chip
          key={option.value}
          clickable
          onClick={() => onPresetSelect(option.value)}
          color={selectedValue === option.value ? "primary" : "default"}
          variant={selectedValue === option.value ? "filled" : "outlined"}
          label={
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: 1.15,
              }}
            >
              <Typography component="span" sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
                {option.label}
              </Typography>
              <Typography
                component="span"
                sx={{
                  fontSize: "0.64rem",
                  fontWeight: 600,
                  color: selectedValue === option.value
                    ? "rgba(255,255,255,0.82)"
                    : PROTOTYPE_TERTIARY_TEXT,
                }}
              >
                {option.westernNotation}
              </Typography>
            </Box>
          }
          title={`${option.label} · ${option.notation}`}
          sx={{
            height: 50,
            minWidth: 104,
            borderRadius: "999px",
            "& .MuiChip-label": {
              px: 2,
              py: 0.5,
            },
          }}
        />
      ))}
      <Chip
        clickable
        aria-label="custom meter"
        onClick={onToggleCustom}
        color={showCustom ? "primary" : "default"}
        variant={showCustom ? "filled" : "outlined"}
        icon={
          <motion.span
            animate={{ rotate: showCustom ? 45 : 0, scale: showCustom ? 1.05 : 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ display: "inline-flex" }}
          >
            <AddIcon sx={{ fontSize: 18, color: "inherit !important" }} />
          </motion.span>
        }
        label=""
        sx={{
          width: 50,
          height: 50,
          minWidth: 50,
          borderRadius: "999px",
          "& .MuiChip-label": {
            display: "none",
            p: 0,
          },
          "& .MuiChip-icon": {
            m: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          },
        }}
      />
    </Stack>
  );
};

export default DesktopBeatControl;
