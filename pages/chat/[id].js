
import React from 'react'
import styled from 'styled-components'
import SideBar from '../../components/SideBar'
import Head from 'next/head'
import ChatScreen from '../../components/ChatScreen'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
function Chat( {chat , messages} ){
  const  [user] = useAuthState(auth)
  return (
    <Container>
        <Head>
            <title>Chat</title>
            //11.53
        </Head> 
        <SideBar/>
        <ChatContainer>
          <ChatScreen chat={chat} messages = {messages} />
        </ChatContainer>
    </Container>
  )
}

export default Chat

export async function getServerSideProps(context){

  const ref = db.collection("chats").doc(context.query.id);

  //prepare the messages on the servser
  const messagesRes = await ref
  .collection('messages')
  .orderBy('timeStamp' , 'asc')
  .get();
  const messages = messagesRes.docs
  .map((doc) => ({
    id : doc.id,
    ...doc.data(),
  }))
  .map((messages) => ({
    ...messages,
    timeStamp : messages.timeStamp.toDate().getTime(),
  }))
  //Prepare the messages on the server
  const chatRes = await ref.get();
  const chat = {
    id : chatRes.id,
    ...chatRes.data()
  }
  return {
    props: {
      messagesRes: JSON.stringify(messagesRes),
      chat : chat ,
    }
  }
}


const Container = styled.div`
  display : flex;
`;
const ChatContainer  = styled.div`
  overflow : scroll;
  height : 100vh;
  flex : 1;
`;