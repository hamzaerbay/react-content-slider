import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './elements/wrapper';
import Button from './elements/button';

const Navigation = ({ prevClick, nextClick }) => (
  <Wrapper>
    <Button onClick={prevClick} prev />
    <Button onClick={nextClick} next />
  </Wrapper>
);

Navigation.propTypes = {
  prevClick: PropTypes.func.isRequired,
  nextClick: PropTypes.func.isRequired,
};

export default Navigation;
