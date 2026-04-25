import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import strings from "../../strings.json";


export default function FloatingActionButtons() {
  const { addAriaLabel, editAriaLabel } = strings.floatingButton;
  return (
    <Box>
      <Fab color="primary" aria-label={addAriaLabel}>
        <AddIcon />
      </Fab>
      <Fab color="secondary" aria-label={editAriaLabel}>
        <EditIcon />
      </Fab>
    </Box>
  );
}
