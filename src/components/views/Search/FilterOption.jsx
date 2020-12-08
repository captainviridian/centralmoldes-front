import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Close as CloseIcon } from '@material-ui/icons';

import {
  Chip, Container, Grid, IconButton, makeStyles, Popover,
} from '@material-ui/core';
import { Toolbar, Typography } from 'components/base';

const useStyles = makeStyles((theme) => ({
  popover: {
    // height: `calc(100vh - ${theme.spacing.headerSize * 2}px)`,
  },
  content: {
    width: '100vh',
    padding: theme.spacing(3),
  },
  toolbar: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 3),
    },
  },
}));

function Option({
  text, options, setSelected,
}) {
  const [anchor, setAnchor] = useState(null);
  const open = !!anchor;
  function close() {
    setAnchor(null);
  }

  const classes = useStyles();

  return (
    <>
      <Grid item>
        <Chip
          label={text}
          variant="outlined"
          onClick={(e) => {
            setAnchor(e.currentTarget.parentNode.parentNode.parentNode);
          }}
        />
      </Grid>
      <Popover
        open={open}
        className={classes.popover}
        onClose={close}
        anchorEl={anchor}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Toolbar className={classes.toolbar}>
          <Typography>
            {text}
          </Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Container maxWidth="xs" className={classes.content}>
          <Grid container direction="column" spacing={3}>
            <Grid item>Opções</Grid>
          </Grid>
        </Container>
      </Popover>
    </>
  );
}

Option.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default Option;
