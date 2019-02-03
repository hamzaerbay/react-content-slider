import styled from 'styled-components';

const Description = styled.p`
    font-size: 1.6vmin;
    line-height: 1.8;
    font-weight: 300;
    margin-bottom: 2.5vmin;
    color: ${props => props.theme.colorWhite};
    text-transform: capitalize;

  @media only screen and (max-width: 768px) {
    font-size: 2.6vmin;
    line-height: 1.5;
  }
`;

export default Description;
