import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../base/Typography';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  error: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
});

function FormFeedback({
  classes,
  error,
  success,
  className,
  children,
}) {
  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.error]: !!error,
          [classes.success]: !!success,
        },
        className,
      )}
    >
      <Typography color="inherit">{children}</Typography>
    </div>
  );
}

FormFeedback.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(
    PropTypes.string,
  ).isRequired,
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default withStyles(styles)(FormFeedback);
