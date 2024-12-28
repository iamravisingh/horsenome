import { css } from "@linaria/core";
import SiriWave from "react-siriwave";

const siriWaveBackground = css`
// position: absolute;
//   top: 0;
//   left: 0;
  width: 100%;
//   height: 50%; /* Set height explicitly */
//   z-index: 90;
  overflow: hidden;
//   background-color: #000; /* Add background color for visibility */
//   margin: 0 auto;
`;


const TickTockAnimation = (props: { isRunning: boolean; bpm: number; }) => {
  const { isRunning, bpm } = props;

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
