# Horsenome API Documentation

## Overview

Horsenome is a React-based metronome application inspired by the rhythmic beat of the dholak's thapi. This documentation covers all public APIs, components, and hooks available in the application.

## Table of Contents

- [Components](#components)
- [Hooks](#hooks)
- [Context & Providers](#context--providers)
- [Theme Configuration](#theme-configuration)
- [Asset Components](#asset-components)
- [Usage Examples](#usage-examples)

---

## Components

### App

The main application component that sets up the layout structure.

**Location:** `src/App.tsx`

**Usage:**
```tsx
import App from './App';

// The App component is the root component
function App() {
  return (
    <Container>
      <Grid container>
        <Header />
        <MetronomeProvider>
          <Metronome />
        </MetronomeProvider>
        <Footer />
      </Grid>
    </Container>
  );
}
```

**Features:**
- Uses Material-UI Grid system for responsive layout
- Integrates with Linaria CSS-in-JS styling
- Sets up the main application structure

---

### Header

Application header component with help tooltip functionality.

**Location:** `src/components/Header/Header.tsx`

**Props:** None

**Features:**
- Displays application title "Horsenome"
- Interactive help icon with usage instructions
- Responsive tooltip with click and touch support

**Usage:**
```tsx
import { Header } from './components/Header';

function App() {
  return (
    <header>
      <Header />
    </header>
  );
}
```

**Tooltip Content:**
- BPM slider usage instructions
- Beat pattern dropdown guidance
- Start/Stop button controls

---

### Footer

Application footer with branding and description.

**Location:** `src/components/Footer/Footer.tsx`

**Props:** None

**Features:**
- Displays application branding
- Shows inspirational description about rhythm and music
- Styled with CSS-in-JS using Linaria

**Usage:**
```tsx
import { Footer } from './components/Footer';

function App() {
  return (
    <footer>
      <Footer />
    </footer>
  );
}
```

---

### Metronome

Main metronome interface container component.

**Location:** `src/components/Metronome/Metronome.tsx`

**Props:** None

**Features:**
- Integrates all metronome controls
- Responsive grid layout
- Visual waveform animation
- BPM and beat controls

**Usage:**
```tsx
import Metronome from './components/Metronome/Metronome';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function App() {
  return (
    <MetronomeProvider>
      <Metronome />
    </MetronomeProvider>
  );
}
```

**Child Components:**
- `TickTockAnimation` - Visual metronome animation
- `BPMControl` - BPM slider control
- `BeatControl` - Beats per measure selector
- `StartStopButton` - Play/pause control

---

### BPMControl

Slider component for controlling beats per minute.

**Location:** `src/components/Metronome/BPMControl.tsx`

**Props:** None (uses metronome context)

**Features:**
- Range: 10-240 BPM
- Real-time BPM display
- Material-UI Slider component
- Tooltips for user guidance

**Usage:**
```tsx
import BPMControl from './components/Metronome/BPMControl';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function MetronomeApp() {
  return (
    <MetronomeProvider>
      <BPMControl />
    </MetronomeProvider>
  );
}
```

**API Methods (via context):**
- `bpm: number` - Current BPM value
- `setBpm: (bpm: number) => void` - Set new BPM value

---

### BeatControl

Dropdown component for selecting beats per measure.

**Location:** `src/components/Metronome/BeatControl.tsx`

**Props:** None (uses metronome context)

**Features:**
- Range: 1-16 beats per measure
- Material-UI Select component
- Clapping hands icon for visual indication
- Full-width responsive design

**Usage:**
```tsx
import BeatControl from './components/Metronome/BeatControl';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function MetronomeApp() {
  return (
    <MetronomeProvider>
      <BeatControl />
    </MetronomeProvider>
  );
}
```

**API Methods (via context):**
- `beatsPerMeasure: number` - Current beats per measure
- `setBeatsPerMeasure: (beats: number) => void` - Set beats per measure

---

### StartStopButton

Play/pause button for metronome control.

**Location:** `src/components/Metronome/StartStopButton.tsx`

**Props:** None (uses metronome context)

**Features:**
- Toggle between start and stop states
- Custom SVG icons for visual feedback
- Large, accessible button design
- Automatic icon switching based on state

**Usage:**
```tsx
import StartStopButton from './components/Metronome/StartStopButton';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function MetronomeApp() {
  return (
    <MetronomeProvider>
      <StartStopButton />
    </MetronomeProvider>
  );
}
```

**API Methods (via context):**
- `isRunning: boolean` - Current playback state
- `startMetronome: () => void` - Start metronome playback
- `stopMetronome: () => void` - Stop metronome playback

---

### TickTockAnimation

Visual waveform animation component using SiriWave.

**Location:** `src/components/TickTock/TickTockAnimation.tsx`

**Props:** None (uses metronome context)

**Features:**
- Real-time waveform visualization
- BPM-responsive animation speed
- Click interaction support
- Full-width responsive canvas

**Usage:**
```tsx
import TickTockAnimation from './components/TickTock/TickTockAnimation';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function MetronomeApp() {
  return (
    <MetronomeProvider>
      <TickTockAnimation />
    </MetronomeProvider>
  );
}
```

**Configuration:**
- Amplitude: 1.6 (wave visibility)
- Speed: Dynamic based on BPM (bpm/60 when running, 0.01 when stopped)
- Color: #6adc92 (green theme)
- Size: 800x400 pixels

---

### HorseshoeIcon

Custom SVG icon component representing a horseshoe.

**Location:** `src/components/TickTock/HorseshoeIcon.tsx`

**Props:** None

**Features:**
- Scalable SVG graphics
- Themed green color (#52af77)
- Responsive sizing (100% width/height)

**Usage:**
```tsx
import HorseshoeIcon from './components/TickTock/HorseshoeIcon';

function MyComponent() {
  return (
    <div style={{ width: '64px', height: '64px' }}>
      <HorseshoeIcon />
    </div>
  );
}
```

---

### RhythmSelector (Unused)

Dialog-based rhythm pattern selector component.

**Location:** `src/components/Metronome/RhythmSelector.tsx`

**Props:** None

**Features:**
- Modal dialog interface
- Radio button selection
- Predefined rhythm patterns (4/4, 3/4, 6/8, 7/8)
- Chip-based trigger button

**Usage:**
```tsx
import RhythmSelector from './components/Metronome/RhythmSelector';

function MetronomeApp() {
  return (
    <div>
      <RhythmSelector />
    </div>
  );
}
```

**Note:** This component is currently not integrated into the main application but is available for future use.

---

## Hooks

### useMetronome

Custom hook for accessing metronome context and functionality.

**Location:** `src/hooks/useMetronome.ts`

**Returns:** `IMetronomeContext`

**Usage:**
```tsx
import { useMetronome } from './hooks/useMetronome';

function MetronomeComponent() {
  const {
    bpm,
    setBpm,
    isRunning,
    startMetronome,
    stopMetronome,
    beatsPerMeasure,
    setBeatsPerMeasure
  } = useMetronome();

  return (
    <div>
      <p>Current BPM: {bpm}</p>
      <p>Beats per measure: {beatsPerMeasure}</p>
      <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
      <button onClick={isRunning ? stopMetronome : startMetronome}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}
```

**Error Handling:**
Throws an error if used outside of `MetronomeProvider` context.

---

## Context & Providers

### MetronomeProvider

Context provider for metronome state management and audio playback.

**Location:** `src/components/Metronome/MetronomeProvider/MetronomeContext.tsx`

**Props:**
```tsx
interface Props {
  children: ReactNode;
}
```

**Context Interface:**
```tsx
interface IMetronomeContext {
  bpm: number;
  setBpm: (bpm: number) => void;
  isRunning: boolean;
  startMetronome: () => void;
  stopMetronome: () => void;
  beatsPerMeasure: number;
  setBeatsPerMeasure: (beats: number) => void;
}
```

**Features:**
- Audio playback using Howler.js
- Separate tick/tock sounds for accent beats
- Automatic interval management
- Beat counting and measure tracking

**Usage:**
```tsx
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';
import { useMetronome } from './hooks/useMetronome';

function App() {
  return (
    <MetronomeProvider>
      <YourMetronomeComponents />
    </MetronomeProvider>
  );
}
```

**Audio Files Required:**
- `/sounds/tick.mp3` - Accent beat sound (first beat of measure)
- `/sounds/tock.mp3` - Regular beat sound

**State Management:**
- BPM: 120 (default), range 10-240
- Beats per measure: 4 (default), range 1-16
- Running state: boolean
- Beat counter: internal tracking for accent beats

---

## Theme Configuration

### theme

Material-UI theme configuration object.

**Location:** `src/theme.ts`

**Usage:**
```tsx
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

**Configuration:**
```tsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Pink/Red
    },
  },
});
```

---

## Asset Components

### SVG Icons

The application includes various SVG icons in the `src/assets/` directory:

- `clapping-hands.svg` - Used in BeatControl component
- `music-player-start.svg` - Start button icon
- `music-player-stop.svg` - Stop button icon
- Various other music-themed icons

**Usage:**
```tsx
import StartIcon from './assets/music-player-start.svg';

function PlayButton() {
  return (
    <img src={StartIcon} alt="Start" width="60" height="60" />
  );
}
```

---

## Usage Examples

### Basic Metronome Setup

```tsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';
import Metronome from './components/Metronome/Metronome';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <MetronomeProvider>
          <Metronome />
        </MetronomeProvider>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
```

### Custom Metronome Component

```tsx
import React from 'react';
import { useMetronome } from './hooks/useMetronome';
import { Button, Typography, Slider } from '@mui/material';

function CustomMetronome() {
  const {
    bpm,
    setBpm,
    isRunning,
    startMetronome,
    stopMetronome,
    beatsPerMeasure,
    setBeatsPerMeasure
  } = useMetronome();

  return (
    <div>
      <Typography variant="h4">
        Custom Metronome: {bpm} BPM
      </Typography>
      
      <Slider
        value={bpm}
        onChange={(_, value) => setBpm(value as number)}
        min={60}
        max={200}
        step={1}
        valueLabelDisplay="auto"
      />
      
      <Typography>
        Beats per measure: {beatsPerMeasure}
      </Typography>
      
      <Button
        variant="contained"
        onClick={isRunning ? stopMetronome : startMetronome}
      >
        {isRunning ? 'Stop' : 'Start'}
      </Button>
    </div>
  );
}

// Usage with provider
function App() {
  return (
    <MetronomeProvider>
      <CustomMetronome />
    </MetronomeProvider>
  );
}
```

### Accessing Metronome State

```tsx
import React from 'react';
import { useMetronome } from './hooks/useMetronome';

function MetronomeStatus() {
  const { bpm, isRunning, beatsPerMeasure } = useMetronome();

  return (
    <div>
      <h3>Metronome Status</h3>
      <p>BPM: {bpm}</p>
      <p>Beats per Measure: {beatsPerMeasure}</p>
      <p>Status: {isRunning ? '🎵 Playing' : '⏸️ Stopped'}</p>
      <p>Interval: {(60 / bpm * 1000).toFixed(0)}ms per beat</p>
    </div>
  );
}
```

### Integration with External Audio

```tsx
import React, { useEffect } from 'react';
import { useMetronome } from './hooks/useMetronome';

function ExternalAudioSync() {
  const { bpm, isRunning } = useMetronome();

  useEffect(() => {
    // Sync external audio system with metronome BPM
    if (isRunning) {
      console.log(`Syncing external audio to ${bpm} BPM`);
      // Your external audio sync logic here
    }
  }, [bpm, isRunning]);

  return (
    <div>
      <p>External audio synced to metronome</p>
      <p>Current tempo: {bpm} BPM</p>
    </div>
  );
}
```

---

## Error Handling

### useMetronome Hook Errors

The `useMetronome` hook will throw an error if used outside of `MetronomeProvider`:

```tsx
// ❌ This will throw an error
function BadComponent() {
  const metronome = useMetronome(); // Error: must be within MetronomeProvider
  return <div>This won't work</div>;
}

// ✅ This works correctly
function GoodComponent() {
  return (
    <MetronomeProvider>
      <ComponentThatUsesMetronome />
    </MetronomeProvider>
  );
}
```

### Audio File Loading

Ensure audio files are available in the `public/sounds/` directory:
- `public/sounds/tick.mp3` - Required for accent beats
- `public/sounds/tock.mp3` - Required for regular beats

---

## Dependencies

The application uses the following key dependencies:

- **React 18.3.1** - Core React library
- **Material-UI 6.2.1** - UI component library
- **Howler.js 2.2.4** - Audio playback management
- **react-siriwave 3.1.0** - Waveform visualization
- **Framer Motion 11.15.0** - Animation library
- **Linaria 6.2.0** - CSS-in-JS styling

---

## Contributing

When adding new components or modifying existing APIs:

1. Ensure all components are properly typed with TypeScript
2. Add comprehensive JSDoc comments for complex functions
3. Include error boundaries where appropriate
4. Test audio functionality across different browsers
5. Maintain responsive design principles
6. Update this documentation for any API changes

---

## License

This project is licensed under the terms specified in the LICENSE file.