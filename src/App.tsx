import Metronome from "./components/Metronome/Metronome";
import Container from "@mui/material/Container";
import { css } from "@linaria/core";
import { Header } from "./components/Header";
import { MetronomeProvider } from "./components/Metronome/MetronomeProvider";
import "./App.css";

const appContainer = css`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px 0 0;
  overflow: hidden;
`;

const mainContent = css`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

function App() {
  return (
    <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <div className={appContainer}>
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
