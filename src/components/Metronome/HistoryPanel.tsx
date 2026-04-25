import { css } from "@linaria/core";
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useMetronome } from "../../hooks/useMetronome";
import strings from "../../strings.json";

const panel = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid rgba(45, 90, 39, 0.08);
`;

const historyList = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & .MuiListItem-root {
    padding: 0;
  }
`;

const toneStyles: Record<string, string> = {
  success: "#2d5a27",
  neutral: "#60705f",
  accent: "#95bd9d",
};

const HistoryPanel = () => {
  const { history } = useMetronome();
  const { description, title } = strings.metronome.history;

  return (
    <Paper elevation={0} className={panel}>
      <Box>
        <Typography variant="overline" sx={{ letterSpacing: "0.24em", color: "rgba(31, 42, 29, 0.55)" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(31, 42, 29, 0.6)" }}>
          {description}
        </Typography>
      </Box>
      <List className={historyList}>
        {history.map((entry) => (
          <ListItem key={entry.id}>
            <ListItemText
              primary={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {entry.label}
                  </Typography>
                  <Chip
                    size="small"
                    label={entry.detail}
                    sx={{
                      backgroundColor: toneStyles[entry.tone],
                      color: "#fff",
                    }}
                  />
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default HistoryPanel;
