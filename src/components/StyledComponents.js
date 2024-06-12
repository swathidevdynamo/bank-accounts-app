// StyledComponents.js
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction : column;
`;

export const FormContainer = styled.div`
  display:flex;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height:10vh;
  margin: 0 auto;
`;

//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

export const StyledForm = styled.form`
  display:flex;
  flex-direction: row;
  align-items:center;
  height:90%;
  width: 80%;
`;

export const StyledField = styled.div`
  width: 40%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  margin-left:5vh;
  margin-top:10px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.hover};
  color: ${({ theme }) => theme.text};
  height:fit-content;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.hover};
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
`;

export const ListContainer = styled.div`
  margin-left : 20px
`;

export const ListHeader = styled.h2`
  display: flex;
`;

export const divContainer = styled.div`
  display: flex;
  margin:20px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const Text = styled.div`
  flex-grow: 1;
  color: ${({ theme }) => theme.background}
`;


export const DeleteIcon = styled.div`
  padding: 5px 10px;
  color: ${({ theme }) => theme.hover};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const NavBarContainer = styled.section`
 margin-top: calc(100vh - 53px)
  width: 100vw;
  height: 53px;
`

export const NavBar = styled.nav`
  background: ${({ theme }) => theme.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100vw;
  height: 53px;
  border: 1px solid black;
  border-bottom: 3px solid #fff;
`

export const Crumbs = styled.ol`
  list-style-type: none;
  padding-left: 0;
`;


export const Crumb = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  margin: 0 15px;
  font-size: 1.2rem;
  
  &:hover {
    color: ${({ theme }) => theme.hover}; /* Slightly lighter color on hover */
  }
`;

// Keyframes for the loading animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the loading symbol
export const LoadingSpinner = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid ${({ theme }) => theme.hover};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
  margin: 20px auto;
`;