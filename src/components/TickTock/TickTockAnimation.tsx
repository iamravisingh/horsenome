import { css } from "@linaria/core";
import SiriWave from "react-siriwave";
import { useMetronome } from "../Metronome/MetronomeProvider";


const siriWaveBackground = css`
  width: 100%;
  overflow: hidden;
`;


const TickTockAnimation = () => {
  const { isRunning, bpm } = useMetronome();
  const amplitude = isRunning ? 2 : 1.5; // Adjust wave visibility based on running state
  const speed = isRunning ? 60 / bpm : 0.02; // Dynamically adjust speed based on BPM

  const handleCanvasClick = () => {
    // stop the howler player;
  }

  return (
    <div className={siriWaveBackground} onClick={handleCanvasClick}>
        <SiriWave
            cover={true}
            width={800}
            height= {800}
            amplitude ={amplitude}
            speed={speed}
            // theme={"ios9"} // Choose style (ios9, classic, or custom)
            color={"6adc92"}
            autostart
        />
    </div>
  );
};

export default TickTockAnimation;
