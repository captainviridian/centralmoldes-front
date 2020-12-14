import React from 'react';

import PropTypes from 'prop-types';

import {
  Grid, makeStyles, useMediaQuery,
} from '@material-ui/core';

import { AppBar, Toolbar } from 'components/base';
import Option from './FilterOption';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: theme.spacing.headerSize,
    color: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
}));

function Filters({ filters }) {
  const classes = useStyles();
  const bigView = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <AppBar
      className={classes.appBar}
      position="fixed"
      color="inherit"
    >
      <Toolbar>
        <Grid
          spacing={2}
          container
          justify={bigView ? 'flex-start' : 'space-between'}
        >
          {filters.map(({
            name, options, showOption, apply,
          }) => (
            <Option
              key={name}
              options={options.map((option) => ({ option, label: showOption(option) }))}
              text={name}
              applyOptions={apply}
            />
          ))}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      showOption: PropTypes.func,
      apply: PropTypes.func,
    }),
  ).isRequired,
};

export default Filters;
