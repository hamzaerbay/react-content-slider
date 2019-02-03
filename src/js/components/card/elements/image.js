import styled from 'styled-components';

const Image = styled.div`
    background-position: center;
    width: 50%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${props => props.image});
    @media only screen and (max-width: 768px) {
        width: 100%;
        height: 55%;
    }
`;

export default Image;
