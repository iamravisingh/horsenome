import { css } from "@linaria/core";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useMetronome } from "../../hooks/useMetronome";
import strings from "../../strings.json";

const countdownWrap = css`
  position: absolute;
  left: 50%;
  top: 8px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  z-index: 2;
  pointer-events: none;

  @media (max-width: 600px) {
    top: 4px;
  }
`;

const celebrationOverlay = css`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1400;
`;

const confettiPiece = css`
  position: absolute;
  top: -24px;
  border-radius: 999px;
  will-change: transform, opacity;
`;

const completionConfettiPieces = [
  { left: "8vw", width: 10, height: 18, color: "#3b6934", rotate: -18, delay: 0 },
  { left: "14vw", width: 9, height: 9, color: "#efd48b", rotate: 16, delay: 0.08 },
  { left: "23vw", width: 8, height: 16, color: "#a5d898", rotate: -10, delay: 0.15 },
  { left: "31vw", width: 10, height: 10, color: "#c8e1c1", rotate: 28, delay: 0.04 },
  { left: "42vw", width: 11, height: 18, color: "#3b6934", rotate: -24, delay: 0.12 },
  { left: "52vw", width: 8, height: 14, color: "#efd48b", rotate: 18, delay: 0.2 },
  { left: "61vw", width: 10, height: 10, color: "#bfe0b2", rotate: -8, delay: 0.1 },
  { left: "73vw", width: 9, height: 17, color: "#3b6934", rotate: 22, delay: 0.18 },
  { left: "82vw", width: 10, height: 10, color: "#efd48b", rotate: -12, delay: 0.06 },
  { left: "91vw", width: 8, height: 16, color: "#a5d898", rotate: 20, delay: 0.16 },
  { left: "4vw", width: 9, height: 14, color: "#c8e1c1", rotate: 10, delay: 0.05 },
  { left: "12vw", width: 8, height: 18, color: "#3b6934", rotate: -28, delay: 0.22 },
  { left: "19vw", width: 11, height: 11, color: "#efd48b", rotate: 12, delay: 0.11 },
  { left: "27vw", width: 8, height: 14, color: "#a5d898", rotate: -16, delay: 0.19 },
  { left: "36vw", width: 10, height: 18, color: "#3b6934", rotate: 24, delay: 0.09 },
  { left: "47vw", width: 9, height: 9, color: "#c8e1c1", rotate: -20, delay: 0.26 },
  { left: "57vw", width: 10, height: 16, color: "#efd48b", rotate: 18, delay: 0.14 },
  { left: "68vw", width: 8, height: 12, color: "#a5d898", rotate: -10, delay: 0.24 },
  { left: "79vw", width: 12, height: 18, color: "#3b6934", rotate: 14, delay: 0.07 },
  { left: "96vw", width: 9, height: 15, color: "#c8e1c1", rotate: -18, delay: 0.21 },
] as const;

const milestoneConfettiPieces = [
  { left: "10vw", width: 8, height: 14, color: "#3b6934", rotate: -14, delay: 0 },
  { left: "22vw", width: 7, height: 12, color: "#efd48b", rotate: 18, delay: 0.06 },
  { left: "34vw", width: 8, height: 8, color: "#a5d898", rotate: -8, delay: 0.12 },
  { left: "46vw", width: 9, height: 15, color: "#3b6934", rotate: 24, delay: 0.04 },
  { left: "58vw", width: 7, height: 11, color: "#c8e1c1", rotate: -12, delay: 0.1 },
  { left: "70vw", width: 8, height: 14, color: "#efd48b", rotate: 14, delay: 0.15 },
  { left: "82vw", width: 9, height: 9, color: "#a5d898", rotate: -18, delay: 0.08 },
  { left: "92vw", width: 8, height: 13, color: "#3b6934", rotate: 16, delay: 0.18 },
] as const;

const formatCountdown = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const PracticeSessionStatus = () => {
  const { countdownSuffix } = strings.metronome.timerControl;
  const { dismissEncouragement, encouragementNotice, isRunning, remainingSeconds } = useMetronome();
  const isCompletion = encouragementNotice?.kind === "completion";
  const shouldShowConfetti = Boolean(encouragementNotice);
  const confettiPieces = isCompletion ? completionConfettiPieces : milestoneConfettiPieces;
  const countdownLabel = useMemo(() => {
    if (!isRunning || remainingSeconds === null) {
      return null;
    }

    return `${formatCountdown(remainingSeconds)} ${countdownSuffix}`;
  }, [countdownSuffix, isRunning, remainingSeconds]);

  useEffect(() => {
    if (!isCompletion || !encouragementNotice) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      dismissEncouragement();
    }, 4200);

    return () => window.clearTimeout(timeoutId);
  }, [dismissEncouragement, encouragementNotice, isCompletion]);

  return (
    <>
      <AnimatePresence initial={false}>
        {countdownLabel ? (
          <motion.div
            key="practice-timer-status"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={countdownWrap}>
              <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                data-testid="practice-timer-status"
                sx={{
                  px: 1.6,
                  py: 0.7,
                  borderRadius: "999px",
                  backgroundColor: "rgba(242, 244, 242, 0.96)",
                  border: "1px solid rgba(193, 200, 193, 0.28)",
                  boxShadow: "0 10px 20px rgba(25, 28, 27, 0.06)",
                  color: "#556158",
                }}
              >
                <AccessTimeRoundedIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {countdownLabel}
                </Typography>
              </Stack>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {shouldShowConfetti && encouragementNotice ? (
        <>
          <div className={celebrationOverlay} data-testid="completion-celebration" aria-hidden="true">
            {confettiPieces.map((piece, index) => (
              <motion.span
                key={`${encouragementNotice.id}-confetti-${index}`}
                className={confettiPiece}
                style={{
                  left: piece.left,
                  width: piece.width,
                  height: piece.height,
                  background: piece.color,
                }}
                initial={{ opacity: 0, y: -24, rotate: piece.rotate, scale: 0.72 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: isCompletion ? [-24, 110, 280, 540] : [-24, 90, 210, 380],
                  x: [0, index % 2 === 0 ? -18 : 18, index % 2 === 0 ? 12 : -12],
                  rotate: isCompletion
                    ? [piece.rotate, piece.rotate + 110, piece.rotate + 220]
                    : [piece.rotate, piece.rotate + 70, piece.rotate + 120],
                  scale: isCompletion ? [0.72, 1, 0.92] : [0.72, 0.94, 0.86],
                }}
                transition={{
                  duration: isCompletion ? 3 : 2.2,
                  delay: piece.delay,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </>
      ) : null}

      <Snackbar
        key={encouragementNotice?.id}
        open={Boolean(encouragementNotice)}
        autoHideDuration={isCompletion ? 4200 : 2500}
        onClose={dismissEncouragement}
        anchorOrigin={{ vertical: isCompletion ? "top" : "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={dismissEncouragement}
          severity="success"
          icon={<CelebrationRoundedIcon fontSize="inherit" />}
          data-testid="encouragement-toast"
          sx={{
            width: "100%",
            alignItems: "center",
            backgroundColor: "#f4f8f1",
            color: "#2e3130",
            border: "1px solid rgba(165, 216, 152, 0.42)",
            "& .MuiAlert-icon": {
              color: "#3b6934",
            },
            ...(isCompletion ? {
              mt: 2,
              minWidth: { xs: "calc(100vw - 32px)", sm: 360 },
              background:
                "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.96), rgba(244, 248, 241, 0.98) 44%, rgba(232, 242, 228, 0.96) 100%)",
              boxShadow: "0 24px 48px rgba(25, 28, 27, 0.14)",
            } : null),
          }}
        >
          <Typography sx={{ fontWeight: 800, fontSize: "0.85rem" }}>
            {encouragementNotice?.title}
          </Typography>
          <Typography sx={{ fontSize: "0.8rem", mt: 0.25 }}>
            {encouragementNotice?.message}
          </Typography>
        </Alert>
      </Snackbar>
    </>
  );
};

export default PracticeSessionStatus;
