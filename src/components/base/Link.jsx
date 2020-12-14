import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

function Link({
  to, children, color, ...props
}) {
  const classes = useStyles();

  return (
    <RouterLink className={classes.link} to={to}>
      <Typography color={color || 'inherit'} {...props}>
        {children}
      </Typography>
    </RouterLink>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default Link;
