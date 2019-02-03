import styled from 'styled-components';

const Title = styled.h2`
  font-weight: 700;
  font-size: 54px;
  text-transform: capitalize;
  line-height: 1.16;
  margin: 3vmin 0 3.5vmin;
  color: ${props => props.theme.colorWhite};

  @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
`;

export default Title;
