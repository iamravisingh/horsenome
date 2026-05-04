import Metronome from "./components/Metronome/Metronome";
import Container from "@mui/material/Container";
import { css } from "@linaria/core";
import { Header } from "./components/Header";
import { MetronomeProvider } from "./components/Metronome/MetronomeProvider";
import "./App.css";

const appContainer = css`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding: 12px 0 0;
  overflow: hidden;

  @media (min-width: 601px) {
    min-height: 100dvh;
    padding-top: 20px;
    overflow: hidden;
  }
`;

const mainContent = css`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: flex-start;
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 601px) {
    align-items: flex-start;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

function App() {
  return (
    <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <div className={appContainer} data-testid="app-shell">
        <Header />
        <div className={mainContent}>
          <MetronomeProvider>
            <Metronome />
          </MetronomeProvider>
        </div>
      </div>
    </Container>
  );
}

export default App;
