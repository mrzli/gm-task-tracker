import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@mui/material';
import { ROUTE_DATA } from '../../app/routing/route-data';

const MENU_ROUTES = ROUTE_DATA.filter((item) => item.hasMenuItem);

export function MainMenu({ onNavigate }) {
  const onNavigateList = useMemo(() => {
    return MENU_ROUTES.map((item) => {
      return () => {
        onNavigate(item.url);
      };
    });
  }, [onNavigate]);

  return (
    <List>
      {MENU_ROUTES.map((pair, index) => (
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

MainMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
