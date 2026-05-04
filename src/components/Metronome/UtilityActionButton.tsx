import { css } from "@linaria/core";
import { ButtonBase } from "@mui/material";
import Typography from "@mui/material/Typography";
import { MouseEvent, ReactNode } from "react";

const actionButton = css`
  width: 80px;
  min-height: 60px;
  border-radius: 18px;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition:
    background-color 150ms ease,
    color 150ms ease,
    box-shadow 150ms ease,
    transform 150ms ease;

  @media (min-width: 601px) {
    width: 88px;
    min-height: 64px;
    padding: 10px 8px;
  }
`;

const actionLabel = css`
  font-size: 0.56rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: inherit;
`;

type UtilityActionButtonProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  testId: string;
  ariaLabel: string;
};

const UtilityActionButton = ({
  active = false,
  ariaLabel,
  disabled = false,
  icon,
  label,
  onClick,
  testId,
}: UtilityActionButtonProps) => {
  return (
    <ButtonBase
      className={actionButton}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      sx={{
        color: disabled
          ? "rgba(157, 184, 158, 0.95)"
          : active
            ? "#3b6934"
            : "rgba(85, 97, 88, 0.54)",
        backgroundColor: "transparent",
        boxShadow: "none",
        border: "1px solid transparent",
        "&:hover": {
          backgroundColor: "rgba(242, 244, 242, 0.52)",
        },
        "&:focus-visible": {
          outline: "none",
          backgroundColor: "rgba(242, 244, 242, 0.72)",
        },
      }}
    >
      {icon}
      <Typography className={actionLabel}>{label}</Typography>
    </ButtonBase>
  );
};

export default UtilityActionButton;
