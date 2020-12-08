import React from 'react';

import PropTypes from 'prop-types';

import { Checkbox as Box, FormControlLabel } from '@material-ui/core';

function Checkbox({ label, ...props }) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Box {...props} />
      }
    />
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Checkbox;
