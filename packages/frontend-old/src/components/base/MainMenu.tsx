import React, { useMemo } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Fn0 } from '@mrzli/gm-js-libraries-utilities/types';
import { ROUTE_DATA } from '../../app/routing/route-data';

interface MainMenuProps {
  readonly onNavigate: (url: string) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps): React.ReactElement {
  const onNavigateList = useMemo<readonly Fn0<void>[]>(() => {
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
