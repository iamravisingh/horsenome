import { css } from "@linaria/core";

export const visualizer = css`
  position: relative;
  width: 100%;
  height: 158px;
  border-radius: 32px;
  background: transparent;
  overflow: hidden;

  @media (max-width: 600px) {
    height: 136px;
    border-radius: 26px;
  }
`;

export const hoverPrompt = css`
  position: absolute;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(241, 246, 234, 0.92);
  border: 1px solid rgba(63, 106, 54, 0.14);
  color: rgba(52, 79, 45, 0.94);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 10px 24px rgba(71, 101, 64, 0.08);

  @media (max-width: 600px) {
    bottom: 8px;
    padding: 7px 12px;
    font-size: 0.58rem;
    letter-spacing: 0.06em;
  }
`;
