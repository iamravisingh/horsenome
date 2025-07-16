import { css } from "@linaria/core";
import SiriWave from "react-siriwave";
import { useMetronome } from "../../hooks/useMetronome";

const siriWaveBackground = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none; /* Prevent touch scrolling interference */
  user-select: none;
`;

const TickTockAnimation = () => {
  const { isRunning, bpm } = useMetronome();
  const amplitude = 1.6;
  const speed = isRunning ? bpm / 60 : 0.01;

  const handleCanvasClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Prevent any scroll behavior from click
  };

  return (
    <div 
      className={siriWaveBackground} 
      onClick={handleCanvasClick}
      onTouchStart={(e) => e.preventDefault()}
    >
      <SiriWave
        cover={true}
        width={800}
        height={280}
        amplitude={amplitude}
        speed={speed}
        color={"6adc92"}
        autostart
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      />
    </div>
  );
};

export default TickTockAnimation;
