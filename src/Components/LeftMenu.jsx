import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Paper, ListItemButton, ListItemIcon } from '@mui/material';
import { NoteAdd } from '@mui/icons-material';

export default function PinnedSubheaderList() {
  return (
 <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'sticky',
        '& ul': { padding: 0 },
        maxHeight: '100vh',
        textAlign: 'left',
        overflow: 'scroll',
      }}
      flex={1}
    >
      <ListItemButton>
        <ListItem sx={{textAlign:'left'}}>
            <NoteAdd/>Add Table
        </ListItem>
      </ListItemButton>
      {[0, 1, 2, 3, 4].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
            {[0, 1, 2,4,5,6].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}