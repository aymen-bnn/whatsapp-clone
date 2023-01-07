import { Avatar, Button, Icon, IconButton } from '@mui/material';
import React from 'react'
import styled from "styled-components"
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from 'email-validator'
import {auth, db} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from './Chat'
function SideBar() {
    const [user] = useAuthState( auth);
    const userChatRef = db.collection('chats').where('users','array-contains',user.email);
    const [chatsSnapShot] = useCollection(userChatRef);
    
    const createChat = () => {

        const input = prompt('Enter email address for the user you want to chat with')
        if(!input) return console.log('no input');

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){
            //We need to add the chat to db chats collection
            db.collection('chats').add({
                users : [user.email,input]
            })
        }  
    }   
             //double !! if value is null it returns false else true 
             //Go chats and check if user has same email with recipient email
    const chatAlreadyExists = (recipientEmail) => 
    !!chatsSnapShot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail?.length>0));
           
  return (
    <Container>
        {/* Header */}
        <Header>
        {/* Search Bar */}
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
            <IconButton>
                <ChatIcon/>
            </IconButton>
            <IconButton>
                <MoreVertIcon/>
            </IconButton>
        </IconsContainer>

        </Header>
        <Search>
                <SearchIcon/>
                <SearchInput placeholder = "Search here ..." />
        </Search>
        <SideBarButton onClick={createChat}>
            Start a new chat
        </SideBarButton>
        {/* List of exists chat */}
        {
            chatsSnapShot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))
            //11.30
        }
    </Container>
    
  )
}

export default SideBar;

const Container = styled.div`
    word-break : break;
    paddin : 15px;
    
`;
const Header = styled.div`
    width : full;
    display : flex;
    position : sticky;
    top : 0;
    background-color : white;
    z-index: 1;
    justify-content : space-between;
    align-items : center;
    padding : 15px ;
    height : 80px;
    border-bottom : 1px solid solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
    margin: 10px ;
    cursor : pointer;
    :hover {
        opacity : 0.8;
    }
`;
const IconsContainer = styled.div``;
const Search = styled.div`
    display : flex;
    align-items : center;
    padding : 20px;
    border-radius : 2 px;

`;
const SearchInput = styled.input`
    width : 100%;
    height : 100%;
    outline-width : 0;
    border : none;
    flex : 1 ;
` 
const SideBarButton = styled(Button)`
    width : 100%;

`