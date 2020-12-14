import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import { Button } from 'components/base';

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 200,
  },
}));

function CallToAction({ text, to, className }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={className}>
      <Button
        color="secondary"
        size="large"
        variant="contained"
        className={classes.button}
        onClick={() => history.push(`/${to}`)}
      >
        { text }
      </Button>
    </div>
  );
}

CallToAction.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default CallToAction;
