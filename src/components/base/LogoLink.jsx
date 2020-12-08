import React from 'react';

import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from './Link';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    color: ({ dark }) => (dark ? theme.palette.primary.main : theme.palette.common.white),
  },
}));

function LogoLink({ dark = false }) {
  const classes = useStyles({ dark });
  const big = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Link
      variant="h6"
      className={classes.title}
      to="/"
    >
      {big ? 'CentralMoldes' : 'CM'}
    </Link>
  );
}

export default LogoLink;
