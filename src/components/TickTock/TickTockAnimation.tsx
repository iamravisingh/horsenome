import { motion } from "framer-motion";

const TickTockAnimation = ({ isRunning, bpm }: { isRunning: boolean, bpm: number }) => {
    const duration = 60 / bpm;
//   if (!isRunning) return null; // Render nothing if not running
  // When the metronome is stopped, we keep the animation steady at the starting point
  if (!isRunning) {
    return (
      <motion.div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "#52af77",
          position: "relative",
        }}
        animate={{ x: "0%" }}
      />
    );
  }
  return (
    <motion.div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "#52af77",
        position: "relative",
      }}
      animate={
        isRunning && {
        x: ["0%", "90%", "0%"], // Move left to right and back
        transition: {
          duration: duration * 2, // Adjust the duration to control the speed
          repeat: Infinity, // Loop the animation
          ease: "easeInOut",
        },
      }}
    />
  );
};

export default TickTockAnimation;
