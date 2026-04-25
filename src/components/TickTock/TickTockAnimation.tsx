import { useTickTockVisualizer } from "../../hooks/useTickTockVisualizer";
import strings from "../../strings.json";
import { hoverPrompt, visualizer } from "./styles";

const TickTockAnimation = () => {
  const { containerRef, isHorseHovered, isRunning } = useTickTockVisualizer();
  const { hoverPrompt: hoverPromptLabel } = strings.tickTock;

  return (
    <div
      className={visualizer}
      ref={containerRef}
      data-testid="metronome-visualizer"
      style={{ cursor: !isRunning && isHorseHovered ? "pointer" : "default" }}
    >
      {!isRunning && isHorseHovered ? (
        <div className={hoverPrompt}>{hoverPromptLabel}</div>
      ) : null}
    </div>
  );
};

export default TickTockAnimation;
