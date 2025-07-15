# Horsenome API Documentation

## Overview

Horsenome is a React-based metronome application inspired by the rhythmic beat of the dholak's thapi. This documentation covers all public APIs, components, and hooks available in the application.

## Table of Contents

- [Components](#components)
- [Hooks](#hooks)
- [Context & Providers](#context--providers)
- [Theme Configuration](#theme-configuration)
- [Asset Components](#asset-components)
- [Rhythm Patterns](#rhythm-patterns)
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
- Interactive help icon with comprehensive usage instructions
- Responsive tooltip with click and touch support
- Updated help content covering all rhythm control features

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
- Rhythm pattern selection and customization
- Beat indicator explanation
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

Main metronome interface container component with enhanced rhythm controls.

**Location:** `src/components/Metronome/Metronome.tsx`

**Props:** None

**Features:**
- Integrates all metronome controls
- Responsive grid layout
- Visual waveform animation
- BPM and beat controls
- **NEW:** Beat pattern indicator
- **NEW:** Rhythm pattern selector
- **NEW:** Custom accent pattern support

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
- `BeatIndicator` - **NEW:** Visual beat pattern display
- `BPMControl` - BPM slider control
- `BeatControl` - Beats per measure selector
- `RhythmSelector` - **NEW:** Enhanced rhythm pattern selector
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
- **UPDATED:** Works with custom rhythm patterns

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

### BeatIndicator (**NEW**)

Visual component that displays the current beat and accent pattern during playback.

**Location:** `src/components/Metronome/BeatIndicator.tsx`

**Props:** None (uses metronome context)

**Features:**
- Real-time beat visualization
- Color-coded accent patterns (blue = accent, gray = regular)
- Current beat highlighting with animation
- Responsive layout for different beat counts
- Pattern description display

**Usage:**
```tsx
import BeatIndicator from './components/Metronome/BeatIndicator';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function MetronomeApp() {
  return (
    <MetronomeProvider>
      <BeatIndicator />
    </MetronomeProvider>
  );
}
```

**Visual States:**
- **Blue Circle:** Accented beat (strong)
- **Gray Circle:** Regular beat (weak)
- **Green Circle:** Currently playing beat (with animation)

**API Methods (via context):**
- `currentBeat: number` - Index of currently playing beat
- `currentRhythm: RhythmPattern` - Active rhythm pattern
- `customAccentPattern: boolean[]` - Custom accent pattern
- `useCustomPattern: boolean` - Whether using custom or predefined pattern

---

### RhythmSelector (**ENHANCED**)

Enhanced dialog-based rhythm pattern selector with custom accent pattern support.

**Location:** `src/components/Metronome/RhythmSelector.tsx`

**Props:** None (uses metronome context)

**Features:**
- **NEW:** Predefined rhythm patterns (2/4, 3/4, 4/4, 6/8, 7/8, 9/8, 5/4)
- **NEW:** Custom accent pattern editor
- **NEW:** Toggle between predefined and custom patterns
- Interactive beat pattern visualization
- Real-time pattern preview
- Comprehensive pattern descriptions

**Usage:**
```tsx
import RhythmSelector from './components/Metronome/RhythmSelector';
import { MetronomeProvider } from './components/Metronome/MetronomeProvider';

function MetronomeApp() {
  return (
    <MetronomeProvider>
      <RhythmSelector />
    </MetronomeProvider>
  );
}
```

**Predefined Patterns:**
- **Simple Duple (2/4)**
  - Pattern: `[true, false]`
  - Description: Strong-weak pattern

- **Waltz (3/4)**
  - Pattern: `[true, false, false]`
  - Description: Strong-weak-weak pattern

- **Common Time (4/4)**
  - Pattern: `[true, false, true, false]`
  - Description: Strong-weak-medium-weak pattern

- **Compound Duple (6/8)**
  - Pattern: `[true, false, false, true, false, false]`
  - Description: Two groups of three

- **Asymmetrical (7/8)**
  - Pattern: `[true, false, false, true, false, true, false]`
  - Description: 3+2+2 pattern

**API Methods (via context):**
- `currentRhythm: RhythmPattern` - Currently selected rhythm
- `setCurrentRhythm: (rhythm: RhythmPattern) => void` - Set predefined rhythm
- `customAccentPattern: boolean[]` - Custom accent pattern
- `setCustomAccentPattern: (pattern: boolean[]) => void` - Set custom pattern
- `useCustomPattern: boolean` - Toggle custom/predefined mode
- `setUseCustomPattern: (useCustom: boolean) => void` - Set pattern mode

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

## Hooks

### useMetronome

Custom hook for accessing metronome context and functionality, including new rhythm features.

**Location:** `src/hooks/useMetronome.ts`

**Returns:** `IMetronomeContext`

**Usage:**
```tsx
import { useMetronome } from './hooks/useMetronome';

function MetronomeComponent() {
  const {
    // Basic controls
    bpm,
    setBpm,
    isRunning,
    startMetronome,
    stopMetronome,
    beatsPerMeasure,
    setBeatsPerMeasure,
    // NEW: Rhythm pattern controls
    currentRhythm,
    setCurrentRhythm,
    customAccentPattern,
    setCustomAccentPattern,
    currentBeat,
    useCustomPattern,
    setUseCustomPattern
  } = useMetronome();

  return (
    <div>
      <p>Current BPM: {bpm}</p>
      <p>Beats per measure: {beatsPerMeasure}</p>
      <p>Current rhythm: {currentRhythm.name} ({currentRhythm.timeSignature})</p>
      <p>Current beat: {currentBeat + 1}</p>
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

Enhanced context provider for metronome state management with rhythm pattern support.

**Location:** `src/components/Metronome/MetronomeProvider/MetronomeContext.tsx`

**Props:**
```tsx
interface Props {
  children: ReactNode;
}
```

**Enhanced Context Interface:**
```tsx
interface IMetronomeContext {
  // Basic metronome controls
  bpm: number;
  setBpm: (bpm: number) => void;
  isRunning: boolean;
  startMetronome: () => void;
  stopMetronome: () => void;
  beatsPerMeasure: number;
  setBeatsPerMeasure: (beats: number) => void;
  
  // NEW: Rhythm pattern features
  currentRhythm: RhythmPattern;
  setCurrentRhythm: (rhythm: RhythmPattern) => void;
  customAccentPattern: boolean[];
  setCustomAccentPattern: (pattern: boolean[]) => void;
  currentBeat: number;
  useCustomPattern: boolean;
  setUseCustomPattern: (useCustom: boolean) => void;
}
```

**Features:**
- Audio playback using Howler.js
- **NEW:** Custom accent pattern support
- **NEW:** Predefined rhythm patterns
- **NEW:** Real-time beat tracking
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
- `/sounds/tick.mp3` - Accent beat sound
- `/sounds/tock.mp3` - Regular beat sound

**State Management:**
- BPM: 120 (default), range 10-240
- Beats per measure: 4 (default), range 1-16
- Current rhythm: Common Time 4/4 (default)
- Running state: boolean
- Beat counter: tracks current beat for visual indication
- Accent patterns: support for both predefined and custom patterns

---

## Rhythm Patterns

### RhythmPattern Interface

```tsx
interface RhythmPattern {
  name: string;
  timeSignature: string;
  beatsPerMeasure: number;
  accentPattern: boolean[]; // true = accent (strong), false = regular (weak)
  description: string;
}
```

### Predefined Patterns

**Available in:** `PREDEFINED_RHYTHMS` constant

```tsx
import { PREDEFINED_RHYTHMS, RhythmPattern } from './components/Metronome/MetronomeProvider';

// Access predefined patterns
const waltzPattern = PREDEFINED_RHYTHMS.find(r => r.name === "Waltz");
console.log(waltzPattern.accentPattern); // [true, false, false]
```

**Pattern Examples:**

1. **Simple Duple (2/4)**
   - Pattern: `[true, false]`
   - Description: Strong-weak pattern

2. **Waltz (3/4)**
   - Pattern: `[true, false, false]`
   - Description: Strong-weak-weak pattern

3. **Common Time (4/4)**
   - Pattern: `[true, false, true, false]`
   - Description: Strong-weak-medium-weak pattern

4. **Compound Duple (6/8)**
   - Pattern: `[true, false, false, true, false, false]`
   - Description: Two groups of three

5. **Asymmetrical (7/8)**
   - Pattern: `[true, false, false, true, false, true, false]`
   - Description: 3+2+2 pattern

### Custom Patterns

Create your own accent patterns:

```tsx
const customPattern = [true, false, true, false, false]; // 5/4 custom pattern
setCustomAccentPattern(customPattern);
setUseCustomPattern(true);
```

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

### Using Predefined Rhythm Patterns

```tsx
import React from 'react';
import { useMetronome } from './hooks/useMetronome';
import { PREDEFINED_RHYTHMS } from './components/Metronome/MetronomeProvider';
import { Button, Typography } from '@mui/material';

function RhythmPicker() {
  const { setCurrentRhythm, currentRhythm, setUseCustomPattern } = useMetronome();

  const selectWaltz = () => {
    const waltz = PREDEFINED_RHYTHMS.find(r => r.name === "Waltz");
    if (waltz) {
      setCurrentRhythm(waltz);
      setUseCustomPattern(false);
    }
  };

  return (
    <div>
      <Typography>Current: {currentRhythm.name}</Typography>
      <Button onClick={selectWaltz}>Select Waltz (3/4)</Button>
    </div>
  );
}
```

### Creating Custom Accent Patterns

```tsx
import React from 'react';
import { useMetronome } from './hooks/useMetronome';
import { Button, Chip } from '@mui/material';

function CustomPatternEditor() {
  const {
    customAccentPattern,
    setCustomAccentPattern,
    setUseCustomPattern,
    beatsPerMeasure
  } = useMetronome();

  const toggleBeat = (index: number) => {
    const newPattern = [...customAccentPattern];
    newPattern[index] = !newPattern[index];
    setCustomAccentPattern(newPattern);
    setUseCustomPattern(true);
  };

  return (
    <div>
      <h3>Custom Pattern Editor</h3>
      {Array.from({ length: beatsPerMeasure }, (_, index) => (
        <Chip
          key={index}
          label={`${index + 1}`}
          color={customAccentPattern[index] ? 'primary' : 'default'}
          onClick={() => toggleBeat(index)}
          style={{ margin: '4px' }}
        />
      ))}
    </div>
  );
}
```

### Rhythm-Aware Practice Session

```tsx
import React, { useEffect, useState } from 'react';
import { useMetronome } from './hooks/useMetronome';
import { Typography } from '@mui/material';

function PracticeTracker() {
  const { currentBeat, isRunning, currentRhythm, customAccentPattern, useCustomPattern } = useMetronome();
  const [measureCount, setMeasureCount] = useState(0);

  useEffect(() => {
    if (isRunning && currentBeat === 0) {
      setMeasureCount(prev => prev + 1);
    }
  }, [currentBeat, isRunning]);

  const getActivePattern = () => {
    return useCustomPattern ? customAccentPattern : currentRhythm.accentPattern;
  };

  const getCurrentBeatType = () => {
    const pattern = getActivePattern();
    return pattern[currentBeat] ? 'ACCENT' : 'regular';
  };

  return (
    <div>
      <Typography variant="h4">Practice Session</Typography>
      <Typography>Measures completed: {measureCount}</Typography>
      <Typography>Current beat: {currentBeat + 1}</Typography>
      <Typography>Beat type: {getCurrentBeatType()}</Typography>
      <Typography>Pattern: {useCustomPattern ? 'Custom' : currentRhythm.name}</Typography>
    </div>
  );
}
```

### Advanced Rhythm Integration

```tsx
import React, { useEffect } from 'react';
import { useMetronome } from './hooks/useMetronome';
import { PREDEFINED_RHYTHMS, RhythmPattern } from './components/Metronome/MetronomeProvider';

function AdvancedMetronome() {
  const {
    bpm,
    setBpm,
    isRunning,
    startMetronome,
    stopMetronome,
    currentRhythm,
    setCurrentRhythm,
    currentBeat,
    customAccentPattern,
    setCustomAccentPattern,
    useCustomPattern,
    setUseCustomPattern
  } = useMetronome();

  // Create a complex 7/8 pattern programmatically
  const createComplexPattern = () => {
    const complexPattern = [true, false, true, false, false, true, false]; // 2+2+3
    setCustomAccentPattern(complexPattern);
    setUseCustomPattern(true);
  };

  // Quick rhythm changes
  const quickRhythms = [
    { name: "Rock (4/4)", pattern: [true, false, true, false] },
    { name: "Swing (4/4)", pattern: [true, false, false, true] },
    { name: "Latin (4/4)", pattern: [true, false, true, true] },
  ];

  const applyQuickRhythm = (pattern: boolean[], name: string) => {
    setCustomAccentPattern(pattern);
    setUseCustomPattern(true);
  };

  return (
    <div>
      <h2>Advanced Rhythm Control</h2>
      
      {/* Current Status */}
      <div>
        <h3>Status</h3>
        <p>BPM: {bpm}</p>
        <p>Rhythm: {useCustomPattern ? 'Custom' : currentRhythm.name}</p>
        <p>Current Beat: {currentBeat + 1}</p>
        <p>Playing: {isRunning ? 'Yes' : 'No'}</p>
      </div>

      {/* Quick Rhythm Buttons */}
      <div>
        <h3>Quick Rhythms</h3>
        {quickRhythms.map((rhythm, index) => (
          <button
            key={index}
            onClick={() => applyQuickRhythm(rhythm.pattern, rhythm.name)}
          >
            {rhythm.name}
          </button>
        ))}
        <button onClick={createComplexPattern}>
          Complex 7/8 Pattern
        </button>
      </div>

      {/* Controls */}
      <div>
        <button onClick={isRunning ? stopMetronome : startMetronome}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <input
          type="range"
          min="60"
          max="200"
          value={bpm}
          onChange={(e) => setBpm(parseInt(e.target.value))}
        />
      </div>
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

### Rhythm Pattern Validation

The system automatically validates rhythm patterns:
- Accent patterns must match beats per measure
- Invalid patterns are auto-corrected
- Beat indices are validated before playback

---

## Dependencies

The application uses the following key dependencies:

- **React 18.3.1** - Core React library
- **Material-UI 6.2.1** - UI component library
- **Howler.js 2.2.4** - Audio playback management
- **react-siriwave 3.1.0** - Waveform visualization
- **Framer Motion 11.15.0** - Animation library (enhanced for beat animations)
- **Linaria 6.2.0** - CSS-in-JS styling

---

## Contributing

When adding new components or modifying existing APIs:

1. Ensure all components are properly typed with TypeScript
2. Add comprehensive JSDoc comments for complex functions
3. Include error boundaries where appropriate
4. Test audio functionality across different browsers
5. Test rhythm patterns with various time signatures
6. Maintain responsive design principles
7. Update this documentation for any API changes
8. Test custom accent patterns with edge cases
9. Ensure beat indicators work correctly with all pattern types

---

## License

This project is licensed under the terms specified in the LICENSE file.