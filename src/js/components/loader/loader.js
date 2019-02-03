import React from 'react';
import LoaderCube from './elements/cube';
import LoaderWrapper from './elements/wrapper';
import LoaderGrid from './elements/grid';

function cubeGenerator() {
  const cubes = [];
  for (let i = 0; i <= 8; i++) {
    cubes.push(<LoaderCube key={i} id={i} />);
  }
  return cubes;
}
const Loader = () => (
  <LoaderWrapper>
    <LoaderGrid>
      {
        cubeGenerator()
      }
    </LoaderGrid>
  </LoaderWrapper>
);

export default Loader;
