import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import { getTimeToDate, getTimeToShort, getTimeBetweenMin }  from "../../moduels/date";
import {ReactComponent as CloseSVG} from '../../assets/img/img-close.svg'
import { useContextState, ChatViewDataType } from '../../moduels/context';

const BubbleWrap = styled.div`
  padding: 10px 20px;
  height: calc(100% - 120px);
  min-height: calc(100vh - 180px);
  overflow: auto;
  margin-bottom: 40px;
`
const BubbleText = styled.div<{sender_type: string}>`
  padding: 7px 0;
  display: flex;
  flex-direction: ${(props) => props.sender_type === 'admin' && "row-reverse"}; 
  align-items: flex-end;
  .message-define {
    max-width: 70%;
    p {
      padding: 12px 15px;
      border-radius: 12px;
      font-size: 14px;
      box-shadow: 0 2px 4px 0 lightgray;
      font-weight: bold;
      margin: 0;
      line-height: 20px;
      background-color: ${(props) => props.sender_type === 'admin' ? "#5b36ac" : "#fff"}; 
      color: ${(props) => props.sender_type === 'admin' ? "#fff" : "#363a42"};
    }
    .message-img {
      position: relative;
      img {
        width: 200px;
        height: auto;
        border-radius: 12px;
      }
      svg {
        width: 19px;
        height: 19px;
        position: absolute;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0,0,0,.7);
        padding: 10px;
        border-radius: 50%;
      }
      &.loading {
      }
      &.loaded {
        svg {
          display: none;
        }
      }
      .message-progress {
        position: absolute;
        width: 200px;
        margin-top: 5px;
        height: 6px;
        box-sizing: border-box;
        border-radius: 3px;
        background-color: #e5e5e7;
        animation: fadeIn 1s forwards 3s;
        > div {
          height: 6px;
          box-sizing: border-box;
          border-radius: 3px;
          background-color: #5b36ac;
          position: absolute;
          opacity: 0;
          &:nth-child(1) {
            width: 30%;
            animation: fadeIn 6s forwards 0;
          }
          &:nth-child(2) {
            width: 60%;
            animation: fadeIn 6s forwards 1s;
          }
          &:nth-child(3) {
            width: 90%;
            animation: fadeIn 6s forwards 2s;
          }
        }
      }
    }
  }
  .message-time {
    margin: 0 8px 5px 8px;
    font-size: 12px;
    line-height: 14px;
    color: #363a42;
    opacity: .4;
    font-weight: 500;
  }
`

const BubbleDateLine = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: #363a42;
  opacity: .4;
  font-weight: 500;
  position: relative;
  margin: 15px 0;
  &:before, &:after {
    content: "";
    width: calc(50% - 60px);
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 1px;
    background: #e6e6eb;
    z-index: 1;
  }
  &:after {
    left: unset;
    right: 0;
  }
  span {
    z-index: 2;
  }
`

const ChatView = () => {
  const state = useContextState();
  const chatRef = useRef<HTMLDivElement>(null);
  const showBubbleTextTime = (index:number, currentChat:ChatViewDataType, nextChat: ChatViewDataType) => {
    if ((index < state.chatView.length-1)
        && (currentChat.sender_type === nextChat.sender_type) 
        && getTimeBetweenMin(currentChat.send_time, nextChat.send_time)) {
      return false;
    } else {
      return getTimeToShort(currentChat.send_time);
    }
  }

  const scrollFix =() => {
    if (chatRef.current) {
      const { scrollHeight } = chatRef.current;
      window.scrollTo(0,scrollHeight);
    }
  }

  useEffect(() => {
    scrollFix();
    setTimeout(() => {
      scrollFix();
    }, 200)

  }, [state.chatView])


return (
    <BubbleWrap ref={chatRef}>
      {state.chatView?.map((chat, index) => {
        return (
          <div
            key={chat.chat_id}
          >
            {(index !== 0 && getTimeToDate(chat.send_time) !== getTimeToDate(state.chatView[index-1].send_time)) && (
              <BubbleDateLine>
                <span>{getTimeToDate(chat.send_time)}</span>
              </BubbleDateLine>
            )}
            <BubbleText
              sender_type={chat.sender_type}
            >
              <div className="message-define">
                {chat.send_message_type === "text" ? (
                  <p>{chat.send_message}</p>
                ): (
                  <div className={`message-img ${!chat.is_send ? "loading": "loaded"}`}>
                    <img src={chat.send_message} alt="img" />
                    <CloseSVG/>
                    <div className="message-progress">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                  
                )}
              </div>
              <p className="message-time">
                {showBubbleTextTime(index, chat, state.chatView[index+1])}
              </p>
            </BubbleText>
          </div>
        )
      })}
    </BubbleWrap>
  );
}

export default ChatView;
 