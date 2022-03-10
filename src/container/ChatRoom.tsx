import React, { useEffect } from "react";
import GlobalBar from "../components/common/GlobalBar";
import styled from "styled-components";
import ChatView from "../components/chat/ChatView";
import ChatInput from "../components/chat/ChatInput";
import ChatImgBar from "../components/chat/ChatImgBar";
import { useContextState, useContextDispatch } from '../moduels/context';
import {useParams} from "react-router-dom";

const Container = styled.div`
  animation: slideToLeft .5s forwards;
  background-color: #f9f9fb;
`
const ChatViewWrap = styled.div`
  background-color: #f9f9fb;
`

const ChatRoom = () => {
  const { room_id } = useParams();
  const state = useContextState();
  const dispatch = useContextDispatch();
  
  useEffect(() => {
    const roomId = Number(room_id);
    dispatch({ type: 'SET_CURRENT_USER', id: roomId});
    dispatch({ type: 'LOAD_CHAT_VIEW' });
  }, [dispatch, room_id])

  return (
    <Container>
      <GlobalBar
        type="chat"
        title={state.currentUserName}
        />
      {state.showImgBar && (
        <ChatImgBar />
      )}
      <ChatViewWrap>
        <ChatView/>
        <ChatInput/>
      </ChatViewWrap>
    </Container>
  );
}

export default ChatRoom;
 