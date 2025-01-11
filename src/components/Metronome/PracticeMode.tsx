// import { useState } from 'react';
// import {
//   Box,
//   Button,
//   Collapse,
//   TextField,
//   Typography,
//   Slider,
// } from '@mui/material';

// const PracticeSession = () => {
//   const [showPracticeConfig, setShowPracticeConfig] = useState(false);
//   const [initialBpm, setInitialBpm] = useState(80);
//   const [targetBpm, setTargetBpm] = useState(120);
//   const [sessionDuration, setSessionDuration] = useState(5);

//   const handleInitialBpmChange = (event) => {
//     setInitialBpm(event.target.value);
//   };

//   const handleTargetBpmChange = (event) => {
//     setTargetBpm(event.target.value);
//   };

//   const handleDurationChange = (event, value) => {
//     setSessionDuration(value);
//   };

//   const startPracticeSession = () => {
//     console.log('Starting Practice Session:', {
//       initialBpm,
//       targetBpm,
//       sessionDuration,
//     });
//   };

//   return (
//     <Box sx={{ width: 300, margin: '0 auto', textAlign: 'center', padding: 2 }}>
//       <Button
//         variant="contained"
//         color="info"
//         fullWidth
//         onClick={() => setShowPracticeConfig(!showPracticeConfig)}
//       >
//         {showPracticeConfig ? 'Hide Practice Mode' : 'Show Practice Mode'}
//       </Button>

//       <Collapse in={showPracticeConfig} sx={{ marginTop: 2 }}>
//         <Box>
//           <Typography variant="subtitle1">Initial BPM</Typography>
//           <TextField
//             value={initialBpm}
//             onChange={handleInitialBpmChange}
//             type="number"
//             fullWidth
//           />

//           <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
//             Target BPM
//           </Typography>
//           <TextField
//             value={targetBpm}
//             onChange={handleTargetBpmChange}
//             type="number"
//             fullWidth
//           />

//           <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
//             Session Duration (Minutes)
//           </Typography>
//           <Slider
//             value={sessionDuration}
//             onChange={handleDurationChange}
//             step={1}
//             marks
//             min={1}
//             max={60}
//             valueLabelDisplay="auto"
//           />

//           <Button
//             variant="contained"
//             color="success"
//             fullWidth
//             sx={{ marginTop: 2 }}
//             onClick={startPracticeSession}
//           >
//             Start Practice Session
//           </Button>
//         </Box>
//       </Collapse>
//     </Box>
//   );
// };

// export default PracticeSession;
