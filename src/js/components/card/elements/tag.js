import styled from 'styled-components';

const Tag = styled.p`
    font-weight: 900;
    font-size: 1.7vmin;
    text-transform: uppercase;
    letter-spacing: 10px;
    color: ${props => props.theme.colorRainDark};

  @media only screen and (max-width: 768px) {
    font-size: 4vmin;
    letter-spacing: 8px;
  }
`;

export default Tag;
