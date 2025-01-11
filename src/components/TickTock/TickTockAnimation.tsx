import { css } from "@linaria/core";
import SiriWave from "react-siriwave";
import { useMetronome } from "../../hooks/useMetronome";

const siriWaveBackground = css`
  width: 100%;
  overflow: hidden;
`;


const TickTockAnimation = () => {
  const { isRunning, bpm } = useMetronome();
  const amplitude = 1.6; // Adjust wave visibility based on running state
  const speed = isRunning ? bpm / 60 : 0.01; // Dynamically adjust speed based on BPM
  // const frequencyOffset = (bpm / 120) * 0.01; // Adjust offset based on BPM


  const handleCanvasClick = () => {
    // stop the howler player;
  }

  return (
    <div className={siriWaveBackground} onClick={handleCanvasClick}>
        <SiriWave
            cover={true}
            width={800}
            height= {400}
            amplitude ={amplitude}
            speed={speed}
            // frequency={frequencyOffset}
            // theme={"ios9"} // Choose style (ios9, classic, or custom)
            color={"6adc92"}
            autostart
        />
    </div>
  );
};

export default TickTockAnimation;
