import styled from 'styled-components';

const Wrapper = styled.div`
    position: fixed;
    width: 4vmin;
    height: 8vmin;
    right: 2%;
    bottom: 0;
    top: 80%;
    color: ${props => props.theme.colorWhite};
    margin: auto 0;

  @media only screen and (max-width: 768px) {
    width: 11vmin;
    height: 22vmin;
    right: 0%;
    bottom: 4px;
    top: auto;
  }
`;

export default Wrapper;
