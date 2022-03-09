import React, {useEffect,useState} from "react";
import {ReactComponent as SendSVG} from '@/assets/img/img-send.svg'
import styled from "styled-components";

const InputWrap = styled.div`
  position: sticky;
  bottom: 20px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #f9f9fb;
  &::before,&::after  {
    content: "";
    height: 30px;
    top: -20px;
    position: absolute;
    background-color: #f9f9fb;
    left: 0;
    width: 100%;
  }
  &::after {
    top: unset;
    bottom: -20px;
  }
`
const InputText = styled.div`
  width: calc(100% - 90px);
  margin-left: 15px;
  position: relative;
  z-index: 1;
  textarea {
    box-sizing: border-box;
    resize: none;
    width: 100%;
    height: 50px;
    padding: 15px;
    border-radius: 25px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border: none;
    border-radius: 40px;
    font-size: 14px;
    font-weight: 500;
    &:focus {
      outline: none;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
    }
    &::placeholder {
      color: #74747e;
      font-size: 14px;
      font-weight: 500;
    }
  }
`
const InputBtn = styled.div`
  right: 16px;
  margin-left: 10px;
  background:#5b36ac;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const ChatInput = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

 
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(event.currentTarget.value);
};

  // const sendMessage = (e:React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.keyCode === 13 && !e.shiftKey && e.target.value.trim().length > 0) {
  //     e.prehandleChangeventDefault();
  //     setInputMessage("");
  //     // socketRef.current.emit("request_chat", messageObj);
  //     console.log("🔵 request_chat");
  //   }
  // };

  return (
    <InputWrap>
      <InputText>
        <textarea 
          value={inputMessage} 
          name="textarea" 
          onChange={handleChange}
          // onKeyDown={sendMessage} 
          placeholder="메시지를 입력하세요." 
        />
      </InputText>
      <InputBtn>
        <SendSVG/>
      </InputBtn>
    </InputWrap>
  );
}

export default ChatInput;
 