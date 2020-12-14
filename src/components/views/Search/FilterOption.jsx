import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Close as CloseIcon } from '@material-ui/icons';

import {
  Chip, Container, Divider, Grid, IconButton, makeStyles, Popover, Button, Checkbox,
} from '@material-ui/core';
import { Toolbar, Typography } from 'components/base';

const useStyles = makeStyles((theme) => ({
  paper: {
    overflowY: 'hidden',
  },
  popover: {
    marginTop: theme.spacing(2),
    // height: `calc(100vh - ${theme.spacing.headerSize * 2}px)`,
  },
  content: {
    width: '100vh',
    padding: theme.spacing(3),
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  header: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 1, 0, 2.5),
    },
  },
  options: {
    padding: theme.spacing(1),
  },
}));

function Option({
  text, options, applyOptions,
}) {
  const [anchor, setAnchor] = useState(null);
  const open = !!anchor;
  function close() {
    setAnchor(null);
  }

  const classes = useStyles();

  const [selected, setSelected] = useState([]);

  function handleChangeCheckOption({ target: { value, checked } }) {
    setSelected(checked ? [...selected, value] : selected.filter((el) => el !== value));
  }

  function clearSelected() {
    setSelected([]);
    close();
    applyOptions([]);
  }

  function handleSubmit() {
    close();
    applyOptions(selected);
  }

  return (
    <>
      <Grid item>
        <Chip
          label={text}
          variant="outlined"
          onClick={(e) => {
            setAnchor(e.currentTarget.parentNode);
          }}
        />
      </Grid>
      <Popover
        open={open}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
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
        <Toolbar className={classes.header}>
          <Typography variant="h5">
            {text}
          </Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Container maxWidth="xs" className={classes.content}>
          <Grid container spacing={3}>
            {options.map(({ option, label }) => (
              <Grid key={option} item>
                <Checkbox
                  value={option}
                  color="secondary"
                  onChange={handleChangeCheckOption}
                  checked={selected.includes(option)}
                />
                {label}
              </Grid>
            ))}
          </Grid>
        </Container>
        <Divider />
        <Grid container className={classes.options} justify="flex-end" spacing={2}>
          <Grid item>
            <Button
              onClick={clearSelected}
              color="primary"
              variant="outlined"
            >
              Limpar
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleSubmit} color="primary" variant="contained">Aplicar</Button>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

Option.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    option: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  applyOptions: PropTypes.func.isRequired,
};

export default Option;
