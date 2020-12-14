import {
  CheckoutContext, LoadingContext, LoggedUserContext, MessageContext,
} from 'context';
import React from 'react';
import PropTypes from 'prop-types';

function ApplicationContext({
  loggedUser,
  sendMessage,
  loading,
  checkout,
  children,
}) {
  return (
    <LoggedUserContext.Provider value={loggedUser}>
      <MessageContext.Provider value={sendMessage}>
        <LoadingContext.Provider value={loading}>
          <CheckoutContext.Provider value={checkout}>
            {children}
          </CheckoutContext.Provider>
        </LoadingContext.Provider>
      </MessageContext.Provider>
    </LoggedUserContext.Provider>
  );
}

ApplicationContext.propTypes = {
  loggedUser: PropTypes.shape({
    type: PropTypes.string,
    first_name: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default ApplicationContext;
