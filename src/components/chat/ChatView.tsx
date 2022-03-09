import styled from "styled-components";
import {ChatViewData} from "../../utils/dummyData";

const BubbleWrap = styled.div`
  background-color: #fff;
`
const Bubble = styled.div<{sender_type: string}>`
  background-color: ${(props) => props.sender_type === 'admin' ? "#5b36ac" : "#fff"}; 
  text-align: ${(props) => props.sender_type === 'admin' ? "right" : "left"}; 
`

interface ChatViewDataType {
  chat_id: number,
  sender_type: string,
  send_message_type: string,
  send_message: string,
  send_time: string,
}

const ChatView = () => {

  return (
    <>
      {ChatViewData.map((chat:ChatViewDataType) => {
        return (
          <BubbleWrap
            key={chat.chat_id}
          >
            <Bubble
              sender_type={chat.sender_type}
            >
              <p>

               {chat.send_message}
              </p>
            </Bubble>
          </BubbleWrap>
        )
      })}
    </>
  );
}

export default ChatView;
 