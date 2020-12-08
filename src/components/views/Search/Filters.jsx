import React, { createRef } from 'react';

import { Chip, Grid, makeStyles } from '@material-ui/core';

import { AppBar, Toolbar } from 'components/base';
import Option from './FilterOption';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: theme.spacing.headerSize,
    color: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
}));

function Filters() {
  const classes = useStyles();

  return (
    <AppBar
      className={classes.appBar}
      position="fixed"
      color="transparent"
    >
      <Toolbar>
        <Grid container justify="space-between">
          <Option text="Tipo" />
          <Option text="Tamanho" />
          <Option text="Tags" />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Filters;
