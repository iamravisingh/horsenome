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
  left: 118px;
  top: 34px;
  transform: none;
  padding: 10px 16px;
  border-radius: 18px;
  background: rgba(243, 247, 239, 0.96);
  border: 1px solid rgba(63, 106, 54, 0.16);
  color: rgba(52, 79, 45, 0.94);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 10px 24px rgba(71, 101, 64, 0.08);
  z-index: 2;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 22px;
    top: 100%;
    width: 0;
    height: 0;
    border-style: solid;
    transform: none;
  }

  &::before {
    border-width: 12px 10px 0 10px;
    border-color: rgba(63, 106, 54, 0.16) transparent transparent transparent;
    margin-top: 0;
  }

  &::after {
    border-width: 11px 9px 0 9px;
    border-color: rgba(243, 247, 239, 0.96) transparent transparent transparent;
    margin-top: -1px;
  }

  @media (max-width: 600px) {
    left: 82px;
    top: 28px;
    padding: 8px 12px;
    font-size: 0.58rem;
    letter-spacing: 0.06em;
    border-radius: 16px;

    &::before {
      left: 18px;
      border-width: 10px 8px 0 8px;
    }

    &::after {
      left: 19px;
      border-width: 9px 7px 0 7px;
    }
  }
`;
