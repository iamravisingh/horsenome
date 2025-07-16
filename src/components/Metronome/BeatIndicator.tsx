import React from "react";
import { Box, Typography } from "@mui/material";
import { css } from "@linaria/core";
import { motion } from "framer-motion";
import { useMetronome } from "../../hooks/useMetronome";

const indicatorContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const beatsRow = css`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const beatCircle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  border: 3px solid;
  position: relative;
  user-select: none;
`;

const accentBeat = css`
  border-color: #1976d2;
  background-color: #e3f2fd;
  color: #1976d2;
`;

const regularBeat = css`
  border-color: #9e9e9e;
  background-color: #f5f5f5;
  color: #666;
`;

const activeBeatStyle = css`
  border-color: #4caf50 !important;
  background-color: #4caf50 !important;
  color: white !important;
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
`;

const patternInfo = css`
  text-align: center;
  margin-bottom: 8px;
`;

const BeatIndicator: React.FC = () => {
  const {
    beatsPerMeasure,
    currentBeat,
    isRunning,
    currentRhythm,
    customAccentPattern,
    useCustomPattern,
  } = useMetronome();

  // Get the active accent pattern
  const getActiveAccentPattern = (): boolean[] => {
    if (useCustomPattern) {
      return customAccentPattern;
    }
    return currentRhythm.accentPattern;
  };

  const accentPattern = getActiveAccentPattern();

  const getPatternDescription = () => {
    if (useCustomPattern) {
      const accentCount = accentPattern.filter(Boolean).length;
      return `Custom Pattern (${accentCount} accents)`;
    }
    return `${currentRhythm.name} (${currentRhythm.timeSignature})`;
  };

  return (
    <Box className={indicatorContainer}>
      <Box className={patternInfo}>
        <Typography variant="h6" gutterBottom>
          Beat Pattern
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {getPatternDescription()}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Blue = Accent • Gray = Regular • Green = Current Beat
        </Typography>
      </Box>

      <Box className={beatsRow}>
        {Array.from({ length: beatsPerMeasure }, (_, index) => {
          const isAccent = accentPattern[index];
          const isCurrent = isRunning && currentBeat === index;
          
          return (
            <motion.div
              key={index}
              className={`${beatCircle} ${
                isCurrent 
                  ? activeBeatStyle 
                  : isAccent 
                  ? accentBeat 
                  : regularBeat
              }`}
              animate={
                isCurrent
                  ? {
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 0px rgba(76, 175, 80, 0.6)",
                        "0 0 20px rgba(76, 175, 80, 0.8)",
                        "0 0 0px rgba(76, 175, 80, 0.6)",
                      ],
                    }
                  : { scale: 1 }
              }
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              {index + 1}
            </motion.div>
          );
        })}
      </Box>

      {!isRunning && (
        <Typography variant="caption" color="textSecondary">
          Start the metronome to see the beat indication
        </Typography>
      )}
    </Box>
  );
};

export default BeatIndicator;