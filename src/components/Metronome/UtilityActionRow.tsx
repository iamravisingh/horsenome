import { css } from "@linaria/core";
import TimerControl from "./TimerControl";
import VolumeControl from "./VolumeControl";

const actionRow = css`
  display: flex;
  justify-content: center;
  gap: clamp(12px, 3vw, 28px);
  padding-top: 2px;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
`;

const UtilityActionRow = () => {
  return (
    <div className={actionRow}>
      <VolumeControl />
      <TimerControl />
    </div>
  );
};

export default UtilityActionRow;
