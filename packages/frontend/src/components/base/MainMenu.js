import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText } from '@mui/material';
import { ROUTE_DATA } from '../../app/routing/route-data';

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

MainMenu.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
