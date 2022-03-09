import GlobalBar from "../components/common/GlobalBar";
import styled from "styled-components";
import ChatView from "../components/chat/ChatView";

const Container = styled.div`
  animation: slideToLeft .5s forwards;
`

const ChatRoom = () => {
  return (
    <Container>
      <GlobalBar
        type="chatRead"
        title="오만석사장"
      />
     <ChatView/>
    </Container>
  );
}

export default ChatRoom;
 