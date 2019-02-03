import styled, { keyframes } from 'styled-components';

const cubeAnimation = keyframes`
  0%, 70%, 100% {
    transform: scale3D(1, 1, 1);
  }
  35% {
    transform: scale3D(0, 0, 1);
 }`;

const LoaderCube = styled.div`
  width: 33%;
  height: 33%;
  background-color: #fff;
  float: left;
  animation: ${cubeAnimation} 1.3s infinite ease-in-out;
  animation-delay: ${(props) => {
    const timer = {
      0: '0.2s',
      1: '0.3s',
      2: '0.4s',
      3: '0.1s',
      4: '0.2s',
      5: '0.3s',
      6: '0s',
      7: '0.1s',
      8: '0.2s',
    };
    return timer[props.id];
  }};
`;

export default LoaderCube;
