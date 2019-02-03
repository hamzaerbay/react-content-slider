import styled from 'styled-components';

const Button = styled.button`
    color: ${props => props.theme.colorWhite};
    width: 100%;
    height: 50%;
    border: 0;
    background: transparent;
    font-size: 20px;
    position: relative;
    cursor: pointer;

    &:focus {
        outline: none;
    }

    &:after {
        align-items: center;
        justify-content: center;
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        opacity: 0.6;
        transition: opacity 0.3s ease-out;
    }

    &:hover {
        &:after {
            opacity: 1;
        }
    }

    &:after {
        content: '${props => (props.next ? '↓' : '↑')}';
    }
`;

export default Button;
