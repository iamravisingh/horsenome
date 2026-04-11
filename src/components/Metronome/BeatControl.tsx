import { css } from "@linaria/core";
import {
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useMetronome } from "../../hooks/useMetronome";
import {
  CUSTOM_METER_LIMITS,
  DEFAULT_METER_PRESETS,
} from "./constant";
import MobileBeatControl from "./MobileBeatControl";
import DesktopBeatControl from "./DesktopBeatControl";

const beatControl = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const selectedPreset = DEFAULT_METER_PRESETS.find(
    (option) =>
      option.beats === timeSignature.beats && option.unit === timeSignature.unit
  );

  const handlePresetSelect = (value: string) => {
    if (value === "custom") {
      setShowCustom(true);
      return;
    }

    const preset = DEFAULT_METER_PRESETS.find((option) => option.value === value);
    if (!preset) {
      return;
    }

    setShowCustom(false);
    setTimeSignature({ beats: preset.beats, unit: preset.unit });
  };

  return (
    <div className={beatControl}>
      {isMobile ? (
        <MobileBeatControl
          selectedValue={selectedValue}
          selectedWesternNotation={selectedPreset?.westernNotation}
          onPresetSelect={handlePresetSelect}
        />
      ) : (
        <DesktopBeatControl
          selectedValue={selectedValue}
          showCustom={showCustom}
          onPresetSelect={handlePresetSelect}
          onToggleCustom={toggleCustom}
        />
      )}

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
