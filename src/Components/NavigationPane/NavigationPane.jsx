import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Paper, ListItemButton, ListItemIcon } from '@mui/material';
import { Note, NoteAdd } from '@mui/icons-material';

export default function NavigationPane({height}) {
    const data = {
        "Airlines": ["DAL", "LUV", "BA", "AIR FP", "AAL", "ALK", "JBLU", "ULCC", "SAVE", "UAL", "AIRFRANCE"],
        "Package": ["UPS", "FDX", "EXPD", "CHRW", "GXO", "XPO", "HUBG", "JBHT"],
        "RRs": ["UNP", "TRN", "KEX", "CCSX", "WAB", "NSC", "MATX"],
        "Trucking": ["ODFL", "KNX", "SAIA", "SNDR", "WERN", "RXO", "ARCB", "MRTN", "HTLD"],
        "Manufacturing": ["PCAR"],
        "Uber": ["UBER", "HTZ", "CAR", "LYFT", "UHAL", "WSC", "ABNB", "URI", "HRI", "DASH", "AL"],
        "UberEats": ["R", "GATX"]
      }

      
  return (
    <List
    flex={2}
      sx={{
        zIndex:'2',
        width: '20%',
        minWidth: '200px',
        bgcolor: 'background.paper',
        '& ul': { padding: 0 },
        maxHeight: `${height}vh`,
        textAlign: 'left',
        overflow: 'scroll',
        paddingTop: '0px',
        paddingBottom:'0px'
      }}
    >
      <ListItemButton sx={{justifyContent:'space-around'}}>
        <ListItemIcon sx={{justifyContent:'center'}}>
          <NoteAdd/>
        </ListItemIcon>
        <ListItem sx={{textAlign:'left'}}>
            Add Table
        </ListItem>
      </ListItemButton>
      {['Airlines', 'Packages', 'RRs', 'Trucking', 'Manufacturing', 'Uber'].map((sectionId) => {
        if (data[sectionId]) {
          return (
            <li key={`section-${sectionId}`}>
              <ul>
                <ListSubheader>{sectionId}</ListSubheader>
                {data[sectionId].map((item) => (
                  <ListItem key={`item-${sectionId}-${item}`}>
                    <ListItemButton>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </ul>
            </li>
          );
        }
        return null;
      })}
    </List>
  );
}