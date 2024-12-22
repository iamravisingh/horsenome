import Metronome from "./components/Metronome/Metronome";
import { Container } from "@mui/material";
import { css } from "@linaria/core";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import './App.css'

const appContainer = css`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
`;

const headerFooter = css`
  flex-shrink: 0; /* Prevent shrinking */
  height: 60px; /* Fixed height for header/footer */
  background-color: #282c34; /* Example background color */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const mainContent = css`
  flex-grow: 1; /* Take up remaining space */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  // background: linear-gradient(to bottom, #f0f4f8, #cfd8dc); /* Example gradient */
`;

function App() {
  return (
    <Container className={appContainer}>
      <div className={headerFooter}>
        <Header />
      </div>
      <div className={mainContent}>
        <Metronome />
      </div>
      <div className={headerFooter}>
        <Footer />
      </div>
    </Container>
  )
}

export default App
