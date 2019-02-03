import styled from 'styled-components';

const Content = styled.div`
  padding: 10% 5%;
  box-sizing: border-box;
  width: 50%;
  background-color: ${props => props.theme.colorMidnight};
  transition: background-color 0.3s ease-in-out;

  @media only screen and (max-width: 768px) {
    width: 100%;
    position: relative;
    height: 45%;
    padding: 5% 8% 5% 5%;

    &:before {
      content: '';
      height: 38px;
      width: 100%;
      position: absolute;
      top: -15px;
      z-index: 2;
      left: 0;
      transform: skew(0, 4deg);
      background-color: ${props => props.theme.colorMidnight};
    }
  }
`;

export default Content;
