import React, { useMemo } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { ROUTE_DATA } from '../../app/routing/route-data';

// interface MainMenuProps {
//   readonly onNavigate: (url: string) => void;
// }

export function MainMenu({ onNavigate }) {
  const onNavigateList = useMemo(() => {
    return ROUTE_DATA.map((item) => {
      return () => {
        onNavigate(item.url);
      };
    });
  }, [onNavigate]);

  return (
    <List>
      {ROUTE_DATA.map((pair, index) => (
        <ListItem
          key={index}
          sx={{ cursor: 'pointer' }}
          onClick={onNavigateList[index]}
        >
          <ListItemText primary={pair.label} />
        </ListItem>
      ))}
    </List>
  );
}
