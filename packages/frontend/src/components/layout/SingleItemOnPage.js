import React from 'react';
import PropTypes from 'prop-types';
import './SingleItemOnPage.scss';

export function SingleItemOnPage({ children }) {
  return <div className={'single-item-on-page--root'}>{children}</div>;
}

SingleItemOnPage.propTypes = {
  children: PropTypes.element.isRequired,
};
