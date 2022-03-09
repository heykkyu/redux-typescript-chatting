import React, { useState } from "react";
import GlobalBar from "../components/common/GlobalBar";
import styled from "styled-components";
import ChatView from "../components/chat/ChatView";
import ChatInput from "../components/chat/ChatInput";
import ChatImgBar from "../components/chat/ChatImgBar";
import { useImgBarState, useImgBarDispatch } from '../moduels/imgbar';

const Container = styled.div`
  animation: slideToLeft .5s forwards;
  background-color: #f9f9fb;
`
const ChatViewWrap = styled.div`
  background-color: #f9f9fb;
 
`

const ChatRoom = () => {
  const state = useImgBarState();

  return (
    <Container>
      <GlobalBar
        type="chat"
        title="오만석사장"
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
 