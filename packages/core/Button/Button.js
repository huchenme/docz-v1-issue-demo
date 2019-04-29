import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Button = ({ children, ...otherProps }) => (
  <StyledButton {...otherProps}>{children}</StyledButton>
);

Button.propTypes = {
  /**
   * Button label
   */
  children: PropTypes.string.isRequired
};

export default Button;

export const RawButton = styled.button`
  border: initial;
  margin: initial;
  padding: initial;
  background-color: initial;
  color: initial;
  font-size: initial;
  cursor: pointer;
  font-family: inherit;

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled(RawButton)`
  background-color: '#555';
  padding: 10px;
  color: '#fff';
`;
