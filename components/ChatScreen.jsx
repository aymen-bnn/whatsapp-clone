
import React, { useState } from 'react'
import { auth , db } from '../firebase';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Avatar, IconButton } from '@mui/material';
import { AttachFileOutlined, InsertEmoticonOutlined, MessageRounded, MicOutlined, MoreVertOutlined } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
function ChatScreen({chat , messages}) {
    const [user] = useAuthState( auth)
    const router = useRouter();
    const [input , setInput] = useState("")
    const [messagesSnapshot] = useCollection(db.collection("chats")
    .doc(router.query.id)
    .collection('messages')
    .orderBy("timestamp" , "asc"));
    const showMessages = () => {
      if(messagesSnapshot){
        return messagesSnapshot.docs.map(message => (
          <Message
            key = {message.id}
            user = {message.data().user}
            message = {{
              ...message.data(),
              timestamp : message.data().timestamp?.toDate().getTime()
            }}
          />
        ))
      }
    }
    
    const sendMessage = (e) => {
      e.preventDefault();
      db
      .collection("users")
      .doc(user.uid)
      .set({
        
      } , {merge: true})
    }
  return (
    <Container>
        <Header>
            <Avatar  />
            <HeaderInformations>
               <h3>recipient email </h3>
               <p>last seen ...</p>
            </HeaderInformations>
            <HeaderIcons>
              <IconButton>
                <AttachFileOutlined/>
                <MoreVertOutlined/>
              </IconButton>
            </HeaderIcons>
        </Header>
        <MEssageContainer>
          {/* show messages */}
          {showMessages()}
          <EndOfMessage/>
        </MEssageContainer>

        <InputContainer>
          <InsertEmoticonOutlined/>
          <Input 
            value={input} 
            onChange={e => setInput(e.target.value)} />
          <button 
            hidden 
            disabled={!input}  
            type="submit"
            onClick={() => sendMessage()}>
              Send message
          </button>
          <MicOutlined/>
        </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  position: sticky;
  background-color:white;
  z-index: 100;
  top: 0;
  display: flex;
  align-items: center;
  padding : 10px ;
`;
const HeaderInformations = styled.div`
  margin-left : 15px;
  flex : 1 ;
  >h3 {
    margin-bottom :3px;
  }
  >p {
    font-size : 14px;
    color : gray ;
  }
`;
const HeaderIcons = styled.div``;
const EndOfMessage = styled.div``;
const MEssageContainer = styled.div`
  padding : 30px ;
  background-color : #e5ded8;
  min-height :100%;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding : 10px
  position : sticky;
  background-color:white;
  z-index : 100;
  padding: 5px
`;
const Input = styled.input`
  flex : 1;
  align-items: center;
  padding : 20px;
  bottom : 10px;
  background-color : whitesmoke;
  margin-left : 10px;
  margin-right : 10px;
  border-radius : 3px;
  border: none; 
`;
