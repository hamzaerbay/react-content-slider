import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export default Wrapper;
