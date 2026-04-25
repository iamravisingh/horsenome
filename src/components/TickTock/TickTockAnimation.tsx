import { useTickTockVisualizer } from "../../hooks/useTickTockVisualizer";
import { hoverPrompt, visualizer } from "./styles";

const TickTockAnimation = () => {
  const { containerRef, isHorseHovered, isRunning } = useTickTockVisualizer();

  return (
    <div
      className={visualizer}
      ref={containerRef}
      data-testid="metronome-visualizer"
      style={{ cursor: !isRunning && isHorseHovered ? "pointer" : "default" }}
    >
      {!isRunning && isHorseHovered ? (
        <div className={hoverPrompt}>Wake Horsenome</div>
      ) : null}
    </div>
  );
};

export default TickTockAnimation;
