import React from 'react'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { auth, provider } from '../firebase'
function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => console.log(error))
    }
  return (
    <Container>
        <LoginContainer>
            <Logo src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png' />
            <Button onClick={signIn} >Sign in with google</Button>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
    display: grid ;
    place-items : center;
    height : 100vh;
    background-color : whitesmoke;

`;
const LoginContainer = styled.div`
    padding : 100px;
    display : flex;
    flex-direction : column;
    align-items : center;
    background-color : white;
    box-shadow: 8px 10px 75px -11px rgba(0,0,0,0.73);
    -webkit-box-shadow: 8px 10px 75px -11px rgba(0,0,0,0.73);
    -moz-box-shadow: 8px 10px 75px -11px rgba(0,0,0,0.73);
`;  
const Logo = styled.img`
    height : 200 px;
    width : 200px; 
    margin-bottom : 50px;
`;