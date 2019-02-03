import styled from 'styled-components';

const Paragraph = styled.a`
    color: ${props => props.theme.colorWhite};
    font-size: 1.8vmin;
    display: block;
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;
    text-decoration: none;

    &:after {
        content: ' →';
    }

  @media only screen and (max-width: 768px) {
    font-size: 3vmin;
  }
`;

export default Paragraph;
