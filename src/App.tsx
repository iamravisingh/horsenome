import Metronome from "./components/Metronome/Metronome";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { css } from "@linaria/core";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MetronomeProvider } from "./components/Metronome/MetronomeProvider";
import "./App.css";

const appContainer = css`
  // display: flex;
  // flex-direction: column;
  // height: 100vh; /* Full viewport height */
`;

const headerFooter = css`
  // flex-shrink: 0; /* Prevent shrinking */
  // height: 60px; /* Fixed height for header/footer */
  // // background-color: #282c34; /* Example background color */
  // color: black;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // // border: 2px solid red;
`;

const mainContent = css`
  // flex-grow: 1; /* Take up remaining space */
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // padding: 20px;
  // background: linear-gradient(to bottom, #f0f4f8, #cfd8dc); /* Example gradient */
`;

function App() {
  return (
    <Container>
      <Grid container className={appContainer} spacing={4}>
        <Grid className={headerFooter} size={12}>
          <Header />
        </Grid>
        <Grid className={mainContent} size={12}>
          <MetronomeProvider>
            <Metronome />
          </MetronomeProvider>
        </Grid>
        <Grid className={headerFooter} size={12}>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
