# Horsenome API Documentation

## Overview

Horsenome is a metronome application inspired by the rhythmic beat of the **thapi**, the central sound of the dholak. Built with React, TypeScript, and Material-UI, it provides a modern, interactive metronome experience with visual audio feedback.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Core APIs](#core-apis)
3. [Components](#components)
4. [Hooks](#hooks)
5. [Theming](#theming)
6. [Usage Examples](#usage-examples)
7. [Setup & Installation](#setup--installation)

## Project Structure

```
src/
├── components/
│   ├── Header/           # Application header with help functionality
│   ├── Footer/           # Application footer with branding
│   ├── Metronome/        # Main metronome functionality
│   │   ├── BPMControl.tsx       # BPM slider control
│   │   ├── BeatControl.tsx      # Beat pattern selector
│   │   ├── StartStopButton.tsx  # Play/pause button
│   │   ├── PracticeMode.tsx     # Advanced practice features (commented)
│   │   ├── RhythmSelector.tsx   # Rhythm pattern selector
│   │   ├── FloatingButton.tsx   # Floating action buttons
│   │   └── MetronomeProvider/   # Context provider for metronome state
│   └── TickTock/         # Audio visualization components
├── hooks/
│   └── useMetronome.ts   # Custom hook for metronome functionality
├── assets/               # SVG icons and images
├── theme.ts             # Material-UI theme configuration
└── main.tsx             # Application entry point
```

## Core APIs

### MetronomeProvider Context

The core state management system for the metronome functionality.

#### Interface

```typescript
interface IMetronomeContext {
  bpm: number;                        // Current beats per minute
  setBpm: (bpm: number) => void;      // Set BPM (10-240 range)
  isRunning: boolean;                 // Metronome running state
  startMetronome: () => void;         // Start metronome playback
  stopMetronome: () => void;          // Stop metronome playback
  beatsPerMeasure: number;            // Beats per measure (1-16)
  setBeatsPerMeasure: (beats: number) => void; // Set beats per measure
}
```

#### Usage

```typescript
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function App() {
  return (
    <MetronomeProvider>
      {/* Your components that need metronome functionality */}
    </MetronomeProvider>
  );
}
```

### Audio System

Built on Howler.js for cross-browser audio support.

#### Sound Files
- **Tick Sound**: `/sounds/tick.mp3` - Accent beat (first beat of measure)
- **Tock Sound**: `/sounds/tock.mp3` - Regular beats

#### Audio Features
- Automatic accent on first beat of each measure
- Dynamic BPM adjustment during playback
- Proper cleanup and resource management

## Components

### Header Component

Displays the application title and help functionality.

#### Props
No props required - self-contained component.

#### Features
- Application branding
- Interactive help tooltip with usage instructions
- Responsive design with touch support

#### Usage

```typescript
import { Header } from './components/Header';

function App() {
  return <Header />;
}
```

#### API

```typescript
export const Header: React.FC = () => JSX.Element;
```

### Footer Component

Displays application information and branding.

#### Props
No props required - self-contained component.

#### Features
- Application description
- Inspirational text about rhythm and music
- Responsive typography

#### Usage

```typescript
import { Footer } from './components/Footer';

function App() {
  return <Footer />;
}
```

#### API

```typescript
export const Footer: React.FC = () => JSX.Element;
```

### Metronome Component

The main metronome interface combining all metronome functionality.

#### Props
No props required - uses MetronomeProvider context.

#### Features
- BPM control slider
- Beat pattern selector
- Start/stop functionality
- Audio visualization
- Responsive grid layout

#### Usage

```typescript
import Metronome from './components/Metronome';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function App() {
  return (
    <MetronomeProvider>
      <Metronome />
    </MetronomeProvider>
  );
}
```

#### API

```typescript
const Metronome: React.FC = () => JSX.Element;
export default Metronome;
```

### BPMControl Component

Slider control for adjusting beats per minute.

#### Props
No props - uses `useMetronome` hook for state management.

#### Features
- Material-UI Slider with 10-240 BPM range
- Real-time BPM display
- Tooltip showing current BPM
- Responsive grid layout

#### Usage

```typescript
import BPMControl from './components/Metronome/BPMControl';

// Must be used within MetronomeProvider
function MetronomeInterface() {
  return <BPMControl />;
}
```

#### API

```typescript
const BPMControl: React.FC = () => JSX.Element;
export default BPMControl;
```

#### Internal Events

```typescript
const handleOnChange = (e: Event, value: number | number[]) => {
  const beat = value as number;
  setBpm(beat);
};
```

### BeatControl Component

Dropdown selector for beats per measure.

#### Props
No props - uses `useMetronome` hook for state management.

#### Features
- Material-UI Select with 1-16 beat options
- Visual clapping hands icon
- Responsive design
- Custom menu styling

#### Usage

```typescript
import BeatControl from './components/Metronome/BeatControl';

// Must be used within MetronomeProvider
function MetronomeInterface() {
  return <BeatControl />;
}
```

#### API

```typescript
const BeatControl: React.FC = () => JSX.Element;
export default BeatControl;
```

### StartStopButton Component

Play/pause button for metronome control.

#### Props
No props - uses `useMetronome` hook for state management.

#### Features
- Toggle between start and stop icons
- Visual feedback for current state
- Custom icon sizes and styling
- Accessible button implementation

#### Usage

```typescript
import StartStopButton from './components/Metronome/StartStopButton';

// Must be used within MetronomeProvider
function MetronomeInterface() {
  return <StartStopButton />;
}
```

#### API

```typescript
const StartStopButton: React.FC = () => JSX.Element;
export default StartStopButton;
```

### TickTockAnimation Component

Audio visualization using SiriWave.

#### Props
No props - uses `useMetronome` hook for state management.

#### Features
- Real-time audio waveform visualization
- Dynamic animation based on BPM
- Responsive canvas sizing
- iOS-style wave animation

#### Usage

```typescript
import TickTockAnimation from './components/TickTock';

// Must be used within MetronomeProvider
function MetronomeInterface() {
  return <TickTockAnimation />;
}
```

#### API

```typescript
const TickTockAnimation: React.FC = () => JSX.Element;
export default TickTockAnimation;
```

#### Animation Properties

```typescript
const amplitude = 1.6; // Wave visibility
const speed = isRunning ? bpm / 60 : 0.01; // Dynamic speed based on BPM
```

### HorseshoeIcon Component

Custom SVG icon representing the horseshoe/horse theme.

#### Props
No props required.

#### Features
- Scalable SVG icon
- Custom color scheme (#52af77)
- Responsive sizing

#### Usage

```typescript
import HorseshoeIcon from './components/TickTock/HorseshoeIcon';

function MyComponent() {
  return <HorseshoeIcon />;
}
```

#### API

```typescript
const HorseshoeIcon: React.FC = () => JSX.Element;
export default HorseshoeIcon;
```

### RhythmSelector Component (Available but unused)

Dialog-based rhythm pattern selector.

#### Props
No props required.

#### Features
- Modal dialog interface
- Radio button selection
- Multiple rhythm patterns (4/4, 3/4, 6/8, 7/8)
- Chip-based trigger

#### Usage

```typescript
import RhythmSelector from './components/Metronome/RhythmSelector';

function MetronomeInterface() {
  return <RhythmSelector />;
}
```

#### API

```typescript
const RhythmSelector: React.FC = () => JSX.Element;
export default RhythmSelector;
```

### FloatingActionButtons Component (Utility)

Generic floating action buttons component.

#### Props
No props required.

#### Features
- Material-UI Fab components
- Add and Edit actions
- Primary and secondary colors

#### Usage

```typescript
import FloatingActionButtons from './components/Metronome/FloatingButton';

function MyInterface() {
  return <FloatingActionButtons />;
}
```

#### API

```typescript
const FloatingActionButtons: React.FC = () => JSX.Element;
export default FloatingActionButtons;
```

## Hooks

### useMetronome Hook

Custom React hook for accessing metronome functionality.

#### Return Value

```typescript
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

#### Usage

```typescript
import { useMetronome } from './hooks/useMetronome';

function MyComponent() {
  const { 
    bpm, 
    setBpm, 
    isRunning, 
    startMetronome, 
    stopMetronome,
    beatsPerMeasure,
    setBeatsPerMeasure 
  } = useMetronome();

  const handleStart = () => {
    if (!isRunning) {
      startMetronome();
    }
  };

  return (
    <div>
      <p>Current BPM: {bpm}</p>
      <p>Beats per measure: {beatsPerMeasure}</p>
      <button onClick={handleStart}>
        {isRunning ? 'Running' : 'Start'}
      </button>
    </div>
  );
}
```

#### Error Handling

The hook throws an error if used outside of MetronomeProvider:

```typescript
if (!context) {
  throw new Error("useMetronome must be used within a MetronomeProvider");
}
```

## Theming

### Theme Configuration

Material-UI theme with custom color palette.

#### Theme Object

```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Custom primary color
    },
    secondary: {
      main: '#dc004e', // Custom secondary color
    },
  },
});

export default theme;
```

#### Usage

```typescript
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your components */}
    </ThemeProvider>
  );
}
```

## Usage Examples

### Basic Metronome Setup

```typescript
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';
import Metronome from './components/Metronome';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MetronomeProvider>
        <Metronome />
      </MetronomeProvider>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
```

### Custom Metronome Controls

```typescript
import React from 'react';
import { useMetronome } from './hooks/useMetronome';

function CustomControls() {
  const { 
    bpm, 
    setBpm, 
    isRunning, 
    startMetronome, 
    stopMetronome,
    beatsPerMeasure,
    setBeatsPerMeasure 
  } = useMetronome();

  const increaseBPM = () => {
    setBpm(Math.min(bpm + 5, 240));
  };

  const decreaseBPM = () => {
    setBpm(Math.max(bpm - 5, 10));
  };

  return (
    <div>
      <h3>Custom Metronome Controls</h3>
      
      <div>
        <button onClick={decreaseBPM}>-5 BPM</button>
        <span>Current BPM: {bpm}</span>
        <button onClick={increaseBPM}>+5 BPM</button>
      </div>

      <div>
        <label>
          Beats per measure:
          <select 
            value={beatsPerMeasure} 
            onChange={(e) => setBeatsPerMeasure(Number(e.target.value))}
          >
            {[1,2,3,4,5,6,7,8].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={isRunning ? stopMetronome : startMetronome}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}

// Must be wrapped in MetronomeProvider
function App() {
  return (
    <MetronomeProvider>
      <CustomControls />
    </MetronomeProvider>
  );
}
```

### Audio Visualization Integration

```typescript
import React from 'react';
import TickTockAnimation from './components/TickTock';
import { useMetronome } from './hooks/useMetronome';

function CustomVisualization() {
  const { isRunning, bpm } = useMetronome();

  return (
    <div>
      <h3>Metronome Visualization</h3>
      <p>Status: {isRunning ? 'Playing' : 'Stopped'}</p>
      <p>BPM: {bpm}</p>
      
      <div style={{ width: '100%', height: '300px' }}>
        <TickTockAnimation />
      </div>
    </div>
  );
}
```

## Setup & Installation

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd horsenome

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint
```

### Dependencies

#### Core Dependencies
- **React 18.3.1** - UI framework
- **TypeScript 5.6.2** - Type safety
- **Vite 6.0.3** - Build tool and dev server

#### UI & Styling
- **@mui/material 6.2.1** - Material-UI components
- **@mui/icons-material 6.2.1** - Material-UI icons
- **@emotion/react & @emotion/styled** - CSS-in-JS
- **@linaria/core & @linaria/react** - Zero-runtime CSS-in-JS
- **framer-motion 11.15.0** - Animation library

#### Audio & Visualization
- **howler 2.2.4** - Cross-browser audio library
- **react-siriwave 3.1.0** - Audio visualization
- **siriwave 2.4.0** - Core audio wave visualization

### Audio Files Setup

Ensure these audio files are present in `/public/sounds/`:
- `tick.mp3` - Accent beat sound
- `tock.mp3` - Regular beat sound

## API Reference Summary

### Exported Components
- `Header` - Application header with help
- `Footer` - Application footer with branding  
- `Metronome` (default) - Main metronome interface
- `MetronomeProvider` - Context provider for metronome state
- `BPMControl` (default) - BPM slider control
- `BeatControl` (default) - Beat pattern selector
- `StartStopButton` (default) - Play/pause button
- `TickTockAnimation` (default) - Audio visualization
- `HorseshoeIcon` (default) - Custom SVG icon
- `RhythmSelector` (default) - Rhythm pattern selector
- `FloatingActionButtons` (default) - Utility floating buttons

### Exported Hooks
- `useMetronome` - Access metronome functionality

### Exported Configuration
- `theme` (default) - Material-UI theme configuration
- `metronomeContext` - Direct access to metronome context

### Type Definitions
- `IMetronomeContext` - Interface for metronome context

---

This documentation covers all public APIs, components, and functionality available in the Horsenome metronome application. For additional customization and advanced usage, refer to the individual component source files and the Material-UI documentation.