import { css } from "@linaria/core";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useId, useState } from "react";
import strings from "../../strings.json";

const headerContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0 10px;
`;

const brand = css`
  display: flex;
  align-items: center;
  color: #3b6934;
`;

const sectionStack = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const sectionTitle = css`
  color: #3b6934;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

const actionRow = css`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
`;

const dialogBody = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 640px) {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
    gap: 28px;
    align-items: start;
  }
`;

const dialogColumn = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const quickStartList = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const quickStartItem = css`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
`;

const quickStartIconWrap = css`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bfe0b2;
  color: #325f2c;
`;

const supportCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 28px 20px;
  border-radius: 28px;
  background: #f2f4f2;
`;

export const Header = () => {
  const [open, setOpen] = useState(false);
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const {
    brand: brandLabel,
    quickHelp: {
      triggerAriaLabel,
      dialog: {
        actions,
        badgeLabel,
        closeAriaLabel,
        description,
        quickStart,
        supportCard: supportCardContent,
        title,
      },
    },
  } = strings.header;

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <header className={headerContainer}>
      <div className={brand} data-testid="app-brand">
        <Typography
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.45rem", sm: "1.4rem" },
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {brandLabel}
        </Typography>
      </div>

      <IconButton
        aria-label={triggerAriaLabel}
        data-testid="quick-help-trigger"
        onClick={handleDialogOpen}
        sx={{
          width: { xs: 40, sm: 36 },
          height: { xs: 40, sm: 36 },
          color: "#3b6934",
          "&:hover": {
            backgroundColor: "rgba(59, 105, 52, 0.08)",
          },
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 22 }} />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          "data-testid": "quick-help-dialog",
          sx: {
            borderRadius: { xs: 4, sm: 5 },
            width: "min(100%, 640px)",
            maxWidth: "640px",
            overflow: "hidden",
            boxShadow: "0 40px 100px -20px rgba(25, 28, 27, 0.15)",
          },
        }}
      >
        <DialogContent sx={{ px: { xs: 3.5, sm: 4 }, py: { xs: 3.5, sm: 4 } }}>
          <IconButton
            aria-label={closeAriaLabel}
            onClick={handleDialogClose}
            data-testid="quick-help-close"
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              backgroundColor: "#eff1ef",
              color: "#556158",
              "&:hover": {
                backgroundColor: "#e1e3e1",
              },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          <div className={dialogBody}>
            <div className={dialogColumn}>
              <Stack spacing={1.5} sx={{ pr: { xs: 6, sm: 1 } }}>
                <AutoAwesomeRoundedIcon sx={{ fontSize: 34, color: "#3b6934" }} />
                <Typography
                  id={dialogTitleId}
                  sx={{
                    color: "#3b6934",
                    fontWeight: 800,
                    fontSize: { xs: "1.95rem", sm: "2.2rem" },
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                    whiteSpace: { xs: "normal", sm: "nowrap" },
                  }}
                >
                  {title}
                </Typography>
              </Stack>

              <div className={sectionStack}>
                <Typography className={sectionTitle}>{badgeLabel}</Typography>
                <Typography
                  id={dialogDescriptionId}
                  variant="body2"
                  sx={{
                    color: "rgba(65, 73, 67, 0.92)",
                    lineHeight: 1.55,
                    fontWeight: 500,
                    fontSize: { xs: "0.95rem", sm: "0.98rem" },
                    maxWidth: { xs: "100%", sm: "25ch" },
                  }}
                >
                  {description}
                </Typography>
              </div>

              <Box className={supportCard}>
                <Typography sx={{ fontSize: "1.35rem", lineHeight: 1 }}>❤️</Typography>
                <Typography sx={{ fontWeight: 800, color: "#191c1b" }}>
                  {supportCardContent.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(85, 97, 88, 0.9)", textAlign: "center" }}
                >
                  {supportCardContent.body}
                </Typography>
              </Box>
            </div>

            <div className={dialogColumn}>
              <div className={sectionStack}>
                <Typography className={sectionTitle}>{quickStart.title}</Typography>
                <div className={quickStartList}>
                  {quickStart.items.map((item, index) => {
                    const icon = index === 0
                      ? <TuneRoundedIcon sx={{ fontSize: 18 }} />
                      : index === 1
                        ? <AutoAwesomeRoundedIcon sx={{ fontSize: 18 }} />
                        : index === 2
                          ? <TuneRoundedIcon sx={{ fontSize: 18 }} />
                          : <PlayCircleRoundedIcon sx={{ fontSize: 18 }} />;

                    return (
                      <div className={quickStartItem} key={item}>
                        <div className={quickStartIconWrap}>{icon}</div>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "rgba(65, 73, 67, 0.84)",
                            lineHeight: 1.45,
                            fontSize: { xs: "0.88rem", sm: "0.92rem" },
                            pt: 0.4,
                            maxWidth: "24ch",
                          }}
                        >
                          {item}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={actionRow}>
                <Tooltip title="Open GitHub issues" placement="top">
                  <Button
                    component={Link}
                    href={actions.feedbackHref}
                    target="_blank"
                    rel="noreferrer"
                    variant="contained"
                    color="success"
                    startIcon={<BugReportRoundedIcon />}
                    sx={{
                      minHeight: 56,
                      borderRadius: "18px",
                      fontWeight: 800,
                      textTransform: "none",
                      fontSize: { xs: "0.98rem", sm: "1rem" },
                      whiteSpace: "nowrap",
                      px: { xs: 2, sm: 2.5 },
                      justifyContent: "center",
                      boxShadow: "0 12px 24px rgba(59, 105, 52, 0.18)",
                      "& .MuiButton-startIcon": {
                        mr: 0.8,
                      },
                    }}
                  >
                    {actions.feedbackLabel}
                  </Button>
                </Tooltip>
                <Tooltip title="Send email feedback" placement="top">
                  <Button
                    component={Link}
                    href={actions.supportHref}
                    variant="contained"
                    startIcon={<MailRoundedIcon />}
                    sx={{
                      minHeight: 56,
                      borderRadius: "18px",
                      fontWeight: 800,
                      textTransform: "none",
                      fontSize: { xs: "0.98rem", sm: "1rem" },
                      whiteSpace: "nowrap",
                      px: { xs: 2, sm: 2.5 },
                      justifyContent: "center",
                      backgroundColor: "#eceeec",
                      color: "#2e3130",
                      boxShadow: "none",
                      "& .MuiButton-startIcon": {
                        mr: 0.8,
                      },
                      "&:hover": {
                        backgroundColor: "#e1e3e1",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {actions.supportLabel}
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
