# Horsenome API Documentation

A comprehensive guide to all public APIs, components, and functions in the Horsenome metronome application.

## Table of Contents

1. [Overview](#overview)
2. [Core Components](#core-components)
3. [Context API](#context-api)
4. [Custom Hooks](#custom-hooks)
5. [Utility Components](#utility-components)
6. [Configuration](#configuration)
7. [Assets](#assets)
8. [Usage Examples](#usage-examples)

## Overview

Horsenome is a React/TypeScript metronome application inspired by the rhythmic beat of the dholak's thapi. It provides a modern, interactive metronome with visual feedback and precise timing control.

### Tech Stack
- **React 18.3.1** with TypeScript
- **Material-UI (MUI) 6.2.1** for UI components
- **Framer Motion 11.15.0** for animations
- **Howler.js 2.2.4** for audio playback
- **SiriWave** for visual waveform representation
- **Linaria** for CSS-in-JS styling
- **Vite** for build tooling

## Core Components

### App Component

**Location:** `src/App.tsx`

The main application container that sets up the layout structure.

```typescript
function App(): JSX.Element
```

**Features:**
- Uses Material-UI Grid system for responsive layout
- Integrates Header, Footer, and Metronome components
- Wraps Metronome in MetronomeProvider for state management

**Layout Structure:**
```
Container
├── Grid (Header)
├── Grid (Main Content - Metronome)
└── Grid (Footer)
```

### Header Component

**Location:** `src/components/Header/Header.tsx`

Displays the application title and help information.

```typescript
export const Header = (): JSX.Element
```

**Features:**
- Displays "Horsenome" title
- Interactive help tooltip with usage instructions
- Responsive click/touch handling
- Uses Material-UI components (Tooltip, IconButton, Typography)

**Props:** None

**Usage:**
```typescript
import { Header } from './components/Header';

<Header />
```

### Footer Component

**Location:** `src/components/Footer/Footer.tsx`

Provides application information and branding.

```typescript
export const Footer = (): JSX.Element
```

**Features:**
- Displays app name with heart emoji
- Descriptive text about the app's inspiration
- Responsive styling with Linaria CSS-in-JS

**Props:** None

**Usage:**
```typescript
import { Footer } from './components/Footer';

<Footer />
```

### Metronome Component

**Location:** `src/components/Metronome/Metronome.tsx`

The main metronome interface container.

```typescript
const Metronome = (): JSX.Element
```

**Features:**
- Responsive grid layout for controls
- Integrates all metronome sub-components
- Visual separation with dividers
- Handles different screen sizes (xs, sm, md)

**Sub-components:**
- `TickTockAnimation` - Visual waveform display
- `BPMControl` - Tempo control slider
- `BeatControl` - Beats per measure selector
- `StartStopButton` - Play/pause control

**Usage:**
```typescript
import Metronome from './components/Metronome';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

<MetronomeProvider>
  <Metronome />
</MetronomeProvider>
```

### BPM Control Component

**Location:** `src/components/Metronome/BPMControl.tsx`

Provides tempo control with a slider interface.

```typescript
const BPMControl = (): JSX.Element
```

**Features:**
- Interactive slider (10-240 BPM range)
- Real-time BPM display
- Tooltip with "BPM" label
- Success color theming
- Responsive grid layout

**Dependencies:**
- Uses `useMetronome()` hook
- Material-UI Slider, Typography, Tooltip

**Usage:**
```typescript
import BPMControl from './components/Metronome/BPMControl';

// Must be used within MetronomeProvider
<BPMControl />
```

### Beat Control Component

**Location:** `src/components/Metronome/BeatControl.tsx`

Allows selection of beats per measure (1-16).

```typescript
const BeatControl = (): JSX.Element
```

**Features:**
- Dropdown select with 1-16 beat options
- Visual clapping hands icon
- Customized Material-UI Select styling
- Centered menu items

**Dependencies:**
- Uses `useMetronome()` hook
- Material-UI FormControl, Select, MenuItem

**Usage:**
```typescript
import BeatControl from './components/Metronome/BeatControl';

// Must be used within MetronomeProvider
<BeatControl />
```

### Start/Stop Button Component

**Location:** `src/components/Metronome/StartStopButton.tsx`

Controls metronome playback with visual feedback.

```typescript
const StartStopButton = (): JSX.Element
```

**Features:**
- Toggle between start/stop states
- Dynamic icon switching (play/stop SVGs)
- Large, touch-friendly button (100x100px)
- Icon size: 60x60px

**Dependencies:**
- Uses `useMetronome()` hook
- Material-UI IconButton
- SVG assets for start/stop icons

**Usage:**
```typescript
import StartStopButton from './components/Metronome/StartStopButton';

// Must be used within MetronomeProvider
<StartStopButton />
```

### TickTock Animation Component

**Location:** `src/components/TickTock/TickTockAnimation.tsx`

Provides visual feedback with animated waveforms.

```typescript
const TickTockAnimation = (): JSX.Element
```

**Features:**
- SiriWave integration for waveform display
- Dynamic animation speed based on BPM
- Click interaction (currently unused)
- Responsive canvas sizing (800x400)

**Configuration:**
- **Color:** `#6adc92` (green)
- **Amplitude:** 1.6
- **Speed:** Calculated from BPM (bpm/60)
- **Cover:** true (full container coverage)

**Dependencies:**
- Uses `useMetronome()` hook
- react-siriwave library

**Usage:**
```typescript
import TickTockAnimation from './components/TickTock';

// Must be used within MetronomeProvider
<TickTockAnimation />
```

### Horseshoe Icon Component

**Location:** `src/components/TickTock/HorseshoeIcon.tsx`

A decorative SVG icon representing a horseshoe.

```typescript
const HorseshoeIcon = (): JSX.Element
```

**Features:**
- Pure SVG component
- 64x64 viewBox
- Green fill color (`#52af77`)
- Responsive sizing (100% width/height)

**Usage:**
```typescript
import HorseshoeIcon from './components/TickTock/HorseshoeIcon';

<HorseshoeIcon />
```

## Context API

### Metronome Context

**Location:** `src/components/Metronome/MetronomeProvider/MetronomeContext.tsx`

Provides centralized state management for metronome functionality.

#### Interface

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

#### MetronomeProvider Component

```typescript
export const MetronomeProvider: FC<{ children: ReactNode }> = ({ children })
```

**Features:**
- **State Management:**
  - BPM control (default: 120)
  - Beats per measure (default: 4)
  - Running state tracking
  - Beat counting

- **Audio Handling:**
  - Tick sound for accented beats (first beat of measure)
  - Tock sound for regular beats
  - Howler.js integration for audio playback
  - Preloaded audio files (`/sounds/tick.mp3`, `/sounds/tock.mp3`)

- **Timing Management:**
  - Precise interval-based timing
  - Automatic interval adjustment on BPM changes
  - Cleanup on component unmount

**Audio Files Required:**
- `/public/sounds/tick.mp3` - Accented beat sound
- `/public/sounds/tock.mp3` - Regular beat sound

**Usage:**
```typescript
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

<MetronomeProvider>
  {/* Your metronome components */}
</MetronomeProvider>
```

#### Context Export

```typescript
export const metronomeContext = MetronomeContext;
```

## Custom Hooks

### useMetronome Hook

**Location:** `src/hooks/useMetronome.ts`

Provides access to metronome context with error handling.

```typescript
export const useMetronome = (): IMetronomeContext
```

**Features:**
- Context validation
- Error throwing if used outside provider
- Type-safe access to metronome state

**Error Handling:**
```typescript
throw new Error("useMetronome must be used within a MetronomeProvider");
```

**Usage:**
```typescript
import { useMetronome } from './hooks/useMetronome';

function MyComponent() {
  const { bpm, setBpm, isRunning, startMetronome, stopMetronome } = useMetronome();
  
  // Use metronome state and functions
}
```

**Available Properties:**
- `bpm: number` - Current beats per minute
- `setBpm: (bpm: number) => void` - Update BPM
- `isRunning: boolean` - Metronome playback state
- `startMetronome: () => void` - Start playback
- `stopMetronome: () => void` - Stop playback
- `beatsPerMeasure: number` - Current beat pattern
- `setBeatsPerMeasure: (beats: number) => void` - Update beat pattern

## Utility Components

### Floating Action Buttons

**Location:** `src/components/Metronome/FloatingButton.tsx`

Generic floating action buttons (currently unused in main app).

```typescript
export default function FloatingActionButtons(): JSX.Element
```

**Features:**
- Primary FAB with Add icon
- Secondary FAB with Edit icon
- Material-UI Fab components

### Rhythm Selector (Commented Out)

**Location:** `src/components/Metronome/RhythmSelector.tsx`

Modal dialog for rhythm pattern selection (not currently active).

**Features:**
- Chip-based trigger
- Dialog with radio button selection
- Supports 4/4, 3/4, 6/8, 7/8 time signatures

### Practice Mode (Commented Out)

**Location:** `src/components/Metronome/PracticeMode.tsx`

Advanced practice session configuration (not currently active).

**Features:**
- BPM progression settings
- Session duration control
- Collapsible configuration panel

## Configuration

### Theme Configuration

**Location:** `src/theme.ts`

Material-UI theme customization.

```typescript
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

export default theme;
```

### TypeScript Configuration

Multiple TypeScript configurations for different environments:
- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

### Build Configuration

**Location:** `vite.config.ts`

Vite build tool configuration with React plugin support.

## Assets

### SVG Icons

**Location:** `src/assets/`

Collection of music-themed SVG icons:

- `clapping-hands.svg` - Used in BeatControl component
- `music-player-start.svg` - Start button icon
- `music-player-stop.svg` - Stop button icon
- `music-*.svg` - Various music-themed decorative icons

### Audio Requirements

Required audio files in `/public/sounds/`:
- `tick.mp3` - Accented beat sound (first beat of measure)
- `tock.mp3` - Regular beat sound

## Usage Examples

### Basic Metronome Setup

```typescript
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';
import Metronome from './components/Metronome';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MetronomeProvider>
        <Metronome />
      </MetronomeProvider>
    </ThemeProvider>
  );
}
```

### Custom Metronome Control

```typescript
import { useMetronome } from './hooks/useMetronome';

function CustomMetronomeControl() {
  const {
    bpm,
    setBpm,
    isRunning,
    startMetronome,
    stopMetronome,
    beatsPerMeasure,
    setBeatsPerMeasure
  } = useMetronome();

  const handleBpmChange = (newBpm: number) => {
    if (newBpm >= 10 && newBpm <= 240) {
      setBpm(newBpm);
    }
  };

  const toggleMetronome = () => {
    if (isRunning) {
      stopMetronome();
    } else {
      startMetronome();
    }
  };

  return (
    <div>
      <h3>Current BPM: {bpm}</h3>
      <h3>Beats per Measure: {beatsPerMeasure}</h3>
      <h3>Status: {isRunning ? 'Playing' : 'Stopped'}</h3>
      
      <button onClick={() => handleBpmChange(bpm + 5)}>
        Increase BPM
      </button>
      <button onClick={() => handleBpmChange(bpm - 5)}>
        Decrease BPM
      </button>
      
      <button onClick={toggleMetronome}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      
      <button onClick={() => setBeatsPerMeasure(3)}>
        3/4 Time
      </button>
      <button onClick={() => setBeatsPerMeasure(4)}>
        4/4 Time
      </button>
    </div>
  );
}
```

### Individual Component Usage

```typescript
// Using individual components
import BPMControl from './components/Metronome/BPMControl';
import BeatControl from './components/Metronome/BeatControl';
import StartStopButton from './components/Metronome/StartStopButton';
import TickTockAnimation from './components/TickTock';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function CustomMetronomeLayout() {
  return (
    <MetronomeProvider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TickTockAnimation />
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <BPMControl />
          <BeatControl />
        </div>
        
        <StartStopButton />
      </div>
    </MetronomeProvider>
  );
}
```

### Programmatic Control

```typescript
import { useEffect } from 'react';
import { useMetronome } from './hooks/useMetronome';

function AutoMetronome() {
  const { setBpm, setBeatsPerMeasure, startMetronome } = useMetronome();
  
  useEffect(() => {
    // Set initial configuration
    setBpm(120);
    setBeatsPerMeasure(4);
    
    // Auto-start after 2 seconds
    const timer = setTimeout(() => {
      startMetronome();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [setBpm, setBeatsPerMeasure, startMetronome]);
  
  return <div>Metronome will auto-start in 2 seconds...</div>;
}
```

## Error Handling

### Context Usage Errors

The `useMetronome` hook will throw an error if used outside of `MetronomeProvider`:

```typescript
// ❌ This will throw an error
function BadComponent() {
  const metronome = useMetronome(); // Error: must be used within MetronomeProvider
  return <div>{metronome.bpm}</div>;
}

// ✅ This is correct
function GoodComponent() {
  return (
    <MetronomeProvider>
      <ComponentThatUsesMetronome />
    </MetronomeProvider>
  );
}
```

### Audio Loading

Ensure audio files are available at the correct paths:
- `/public/sounds/tick.mp3`
- `/public/sounds/tock.mp3`

Missing audio files will result in silent metronome operation.

## Performance Considerations

1. **Audio Preloading:** Audio files are preloaded on component mount for smooth playback
2. **Interval Management:** Intervals are properly cleaned up to prevent memory leaks
3. **Re-rendering:** Context updates trigger re-renders only in consuming components
4. **Animation:** SiriWave animations are optimized for 60fps performance

## Browser Compatibility

- **Modern Browsers:** Chrome, Firefox, Safari, Edge (latest versions)
- **Audio Support:** Requires Web Audio API support
- **CSS Grid:** Used for responsive layouts
- **ES Modules:** Requires modern JavaScript support

This documentation provides complete coverage of all public APIs and components in the Horsenome application. For implementation details or advanced customization, refer to the individual component source files.