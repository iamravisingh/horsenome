import { css } from "@linaria/core";
import AddIcon from "@mui/icons-material/Add";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useMetronome } from "../../hooks/useMetronome";
import {
  CUSTOM_METER_LIMITS,
  DEFAULT_METER_PRESETS,
  PROTOTYPE_TERTIARY_TEXT,
} from "./constant";

const beatControl = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const chipRow = css`
  justify-content: center;
  flex-wrap: wrap;
`;

const customMeter = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 18px;
  background: rgba(242, 244, 242, 0.92);
  overflow: hidden;
`;

const customInputs = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const numberInput = css`
  width: 60px;
  height: 44px;
  border: 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.78);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: #325f2c;
  outline: none;
  box-shadow: inset 0 0 0 1px rgba(193, 200, 193, 0.45);

  &:focus {
    box-shadow: inset 0 0 0 2px rgba(59, 105, 52, 0.28);
  }
`;

const slash = css`
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(65, 73, 67, 0.75);
`;

const customLabel = css`
  font-size: 0.62rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(113, 121, 115, 0.72);
  font-weight: 700;
`;

const BeatControl = () => {
  const { timeSignature, setTimeSignature } = useMetronome();
  const [showCustom, setShowCustom] = useState(false);
  const [customBeats, setCustomBeats] = useState(String(timeSignature.beats));
  const [customUnit, setCustomUnit] = useState(String(timeSignature.unit));

  const selectedValue = useMemo(() => {
    const preset = DEFAULT_METER_PRESETS.find(
      (option) =>
        option.beats === timeSignature.beats && option.unit === timeSignature.unit
    );
    return preset ? preset.value : "custom";
  }, [timeSignature.beats, timeSignature.unit]);

  const applyCustomMeter = (beatsValue: string, unitValue: string) => {
    const beats = Math.min(
      CUSTOM_METER_LIMITS.max,
      Math.max(CUSTOM_METER_LIMITS.min, Number.parseInt(beatsValue || "1", 10))
    );
    const unit = Math.min(
      CUSTOM_METER_LIMITS.max,
      Math.max(
        CUSTOM_METER_LIMITS.min,
        Number.parseInt(unitValue || String(CUSTOM_METER_LIMITS.defaultUnit), 10)
      )
    );
    setCustomBeats(String(beats));
    setCustomUnit(String(unit));
    setTimeSignature({ beats, unit });
  };

  const toggleCustom = () => {
    setShowCustom((current) => !current);
  };

  return (
    <div className={beatControl}>
      <Stack direction="row" spacing={1.5} useFlexGap className={chipRow} aria-label="meter">
        {DEFAULT_METER_PRESETS.map((option) => (
          <Chip
            key={option.value}
            clickable
            onClick={() => {
              setShowCustom(false);
              setTimeSignature({ beats: option.beats, unit: option.unit });
            }}
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
          onClick={toggleCustom}
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

      <AnimatePresence initial={false}>
        {showCustom ? (
          <motion.div
            key="custom-meter"
            initial={{ opacity: 0, height: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className={customMeter}>
              <div className={customInputs}>
                <input
                  className={numberInput}
                  type="number"
                  min={CUSTOM_METER_LIMITS.min}
                  max={CUSTOM_METER_LIMITS.max}
                  value={customBeats}
                  aria-label="matras in cycle"
                  onChange={(event) => setCustomBeats(event.target.value)}
                  onBlur={() => applyCustomMeter(customBeats, customUnit)}
                />
                <span className={slash}>/</span>
                <input
                  className={numberInput}
                  type="number"
                  min={CUSTOM_METER_LIMITS.min}
                  max={CUSTOM_METER_LIMITS.max}
                  value={customUnit}
                  aria-label="beat unit"
                  onChange={(event) => setCustomUnit(event.target.value)}
                  onBlur={() => applyCustomMeter(customBeats, customUnit)}
                />
              </div>
              <span className={customLabel}>Custom</span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default BeatControl;
