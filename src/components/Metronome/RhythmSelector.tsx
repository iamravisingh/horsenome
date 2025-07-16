import React, { useState } from "react";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Switch,
  FormControlLabel as MuiFormControlLabel,
  // IconButton,
  Tooltip,
} from "@mui/material";
import { css } from "@linaria/core";
import { useMetronome } from "../../hooks/useMetronome";
import { PREDEFINED_RHYTHMS, RhythmPattern } from "./MetronomeProvider";

const rhythmChip = css`
  cursor: pointer;
  margin: 4px;
`;

const beatPattern = css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 16px 0;
`;

const beatButton = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #1976d2;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const accentBeat = css`
  background-color: #1976d2;
  color: white;
`;

const regularBeat = css`
  background-color: white;
  color: #1976d2;
`;

const patternContainer = css`
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin: 8px 0;
`;

const RhythmSelector = () => {
  const {
    currentRhythm,
    setCurrentRhythm,
    customAccentPattern,
    setCustomAccentPattern,
    useCustomPattern,
    setUseCustomPattern,
    beatsPerMeasure,
  } = useMetronome();

  const [open, setOpen] = useState(false);
  const [selectedRhythm, setSelectedRhythm] = useState<RhythmPattern>(currentRhythm);
  const [tempCustomPattern, setTempCustomPattern] = useState<boolean[]>([...customAccentPattern]);
  const [tempUseCustom, setTempUseCustom] = useState(useCustomPattern);

  const handleChipClick = () => setOpen(true);
  const handleDialogClose = () => {
    setOpen(false);
    // Reset to current values
    setSelectedRhythm(currentRhythm);
    setTempCustomPattern([...customAccentPattern]);
    setTempUseCustom(useCustomPattern);
  };

  const handleRhythmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rhythmName = event.target.value;
    const rhythm = PREDEFINED_RHYTHMS.find(r => r.name === rhythmName);
    if (rhythm) {
      setSelectedRhythm(rhythm);
      setTempCustomPattern([...rhythm.accentPattern]);
    }
  };

  const handleCustomPatternToggle = (index: number) => {
    const newPattern = [...tempCustomPattern];
    newPattern[index] = !newPattern[index];
    setTempCustomPattern(newPattern);
  };

  const handleConfirm = () => {
    if (!tempUseCustom) {
      setCurrentRhythm(selectedRhythm);
    } else {
      setCustomAccentPattern(tempCustomPattern);
    }
    setUseCustomPattern(tempUseCustom);
    setOpen(false);
  };

  const getDisplayText = () => {
    if (useCustomPattern) {
      return `Custom ${beatsPerMeasure}/${beatsPerMeasure <= 4 ? '4' : '8'}`;
    }
    return `${currentRhythm.name} (${currentRhythm.timeSignature})`;
  };

  const renderBeatPattern = (pattern: boolean[], editable: boolean = false) => {
    return (
      <Box className={beatPattern}>
        {pattern.map((isAccent, index) => (
          <Tooltip key={index} title={`Beat ${index + 1}: ${isAccent ? 'Accent' : 'Regular'}`}>
            <div
              className={`${beatButton} ${isAccent ? accentBeat : regularBeat}`}
              onClick={editable ? () => handleCustomPatternToggle(index) : undefined}
              style={{ cursor: editable ? 'pointer' : 'default' }}
            >
              {index + 1}
            </div>
          </Tooltip>
        ))}
      </Box>
    );
  };

  // Ensure custom pattern matches current beats per measure
  React.useEffect(() => {
    if (tempCustomPattern.length !== beatsPerMeasure) {
      const newPattern = Array(beatsPerMeasure).fill(false);
      newPattern[0] = true; // Always accent the first beat
      // Copy existing pattern up to the length available
      for (let i = 0; i < Math.min(tempCustomPattern.length, beatsPerMeasure); i++) {
        newPattern[i] = tempCustomPattern[i];
      }
      setTempCustomPattern(newPattern);
    }
  }, [beatsPerMeasure, tempCustomPattern.length]);

  return (
    <>
      <Chip
        label={getDisplayText()}
        onClick={handleChipClick}
        color="primary"
        className={rhythmChip}
        variant={useCustomPattern ? "outlined" : "filled"}
      />

      <Dialog open={open} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Select Rhythm Pattern</Typography>
          <Typography variant="body2" color="textSecondary">
            Choose a predefined rhythm or create a custom accent pattern
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <MuiFormControlLabel
              control={
                <Switch
                  checked={tempUseCustom}
                  onChange={(e) => setTempUseCustom(e.target.checked)}
                />
              }
              label="Use Custom Pattern"
            />
          </Box>

          {!tempUseCustom ? (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Predefined Rhythms
              </Typography>
              <FormControl>
                <RadioGroup value={selectedRhythm.name} onChange={handleRhythmChange}>
                  {PREDEFINED_RHYTHMS.map((rhythm) => (
                    <Box key={rhythm.name} className={patternContainer}>
                      <FormControlLabel
                        value={rhythm.name}
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="body1">
                              <strong>{rhythm.name}</strong> ({rhythm.timeSignature})
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {rhythm.description}
                            </Typography>
                            {renderBeatPattern(rhythm.accentPattern)}
                          </Box>
                        }
                      />
                    </Box>
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          ) : (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Custom Accent Pattern
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Click on beats to toggle between accent (strong) and regular (weak)
              </Typography>
              <Box className={patternContainer}>
                <Typography variant="body2" gutterBottom>
                  Current Pattern ({beatsPerMeasure} beats):
                </Typography>
                {renderBeatPattern(tempCustomPattern, true)}
                <Typography variant="caption" color="textSecondary">
                  Blue = Accent (strong), White = Regular (weak)
                </Typography>
              </Box>
            </Box>
          )}

          {/* Preview section */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Preview:
            </Typography>
            <Typography variant="body2">
              {tempUseCustom ? (
                <>Custom pattern with {tempCustomPattern.filter(Boolean).length} accented beats</>
              ) : (
                <>{selectedRhythm.name} - {selectedRhythm.description}</>
              )}
            </Typography>
            {renderBeatPattern(tempUseCustom ? tempCustomPattern : selectedRhythm.accentPattern)}
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Apply Pattern
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RhythmSelector;
