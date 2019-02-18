import styled from 'styled-components';
import React, { Component } from 'react';
import Observer from '@researchgate/react-intersection-observer';
import PropTypes from 'prop-types';

const Placeholder = styled.div`
    overflow: hidden;
    width: 50%;
    height: 100%;
    @media only screen and (max-width: 768px) {
        width: 100%;
        height: 55%;
    }
`;

const StyledImage = styled.div`
    background-position: center;
    object-fit: cover;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${props => props.image});
`;

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.handleIntersection = this.handleIntersection.bind(this);
    this.state = {
      showImage: false,
    };
  }

  handleIntersection({ isIntersecting }, unobserve) {
    // First two images will load.
    if (isIntersecting) {
      unobserve();
    }
    this.setState({
      showImage: isIntersecting,
    });
  }

  render() {
    return (
      <Observer onChange={this.handleIntersection}>
        <Placeholder className="placeholder">
          {
            this.state.showImage
              && <StyledImage image={this.props.image.regular} data-purpose="card-img" />
            }
        </Placeholder>
      </Observer>
    );
  }
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
};
