import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { withStyles } from '@material-ui/core/styles';
import { IconButton, useMediaQuery } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import {
  AppBar, Toolbar, Link, LogoLink,
} from 'components/base';

const styles = (theme) => ({
  toolbar: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 3),
    },
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  featuredLink: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar({ classes, menuOptions, onClickMenuButton }) {
  const big = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <LogoLink className={classes.title} />
          </div>
          <div className={classes.right}>
            {big ? menuOptions.map(({ text, featured, ...props }) => (
              <Link
                key={text}
                variant="h6"
                className={clsx(classes.rightLink, featured && classes.featuredLink)}
                {...props}
              >
                {text}
              </Link>
            )) : (
              <>
                <IconButton
                  color="inherit"
                  onClick={onClickMenuButton}
                >
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      featured: PropTypes.bool,
    }),
  ).isRequired,
  onClickMenuButton: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppAppBar);
