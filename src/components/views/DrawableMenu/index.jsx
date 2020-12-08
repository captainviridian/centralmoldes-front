import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  SwipeableDrawer as Drawer,
  Container,
  IconButton,
  Divider,
  Grid,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import {
  Link, Toolbar, LogoLink, Typography,
} from 'components/base';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100vw',
    height: '100%',
    padding: ({ title }) => (title ? theme.spacing(5, 4) : theme.spacing(5, 3)),
  },
  link: {
    color: theme.palette.primary.main,
  },
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
  grid: {
    height: ({ title }) => title && '100%',
  },
}));

function DrawableMenu({
  links, open, onClose, onOpen, title,
}) {
  const classes = useStyles({ title });

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      onClose={onClose}
      open={open}
      onOpen={onOpen}
    >
      <Toolbar className={classes.toolbar}>
        <div className={classes.left}>
          <LogoLink dark />
        </div>
        <div className={classes.right}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </Toolbar>

      <Divider />

      <Container className={classes.content}>
        {title && <Typography variant="h5">{title}</Typography>}
        <Grid className={classes.grid} container direction="column" spacing={2} justify="flex-end">
          {links.map(({ to, text }) => (
            <Grid key={text} item>
              <Link
                to={to}
                variant="h5"
                className={classes.link}
                onClick={onClose}
              >
                {text}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Drawer>
  );
}

DrawableMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default DrawableMenu;
